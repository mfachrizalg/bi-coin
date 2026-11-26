'use strict';

const fs = require('node:fs');
const os = require('node:os');
const readline = require('node:readline');
const { execFileSync, spawn } = require('node:child_process');
const { parseDockerStatsLine } = require('./resource-analysis');

const outputPath = process.env.COMPLIANCE_RESOURCE_OUTPUT;
const intervalMs = Number(process.env.COMPLIANCE_RESOURCE_INTERVAL_MS || 1000);
const runnerPid = Number(process.env.COMPLIANCE_RUNNER_PID || process.ppid);
if (!outputPath || !Number.isInteger(intervalMs) || intervalMs < 1000) {
    throw new Error('set COMPLIANCE_RESOURCE_OUTPUT and an interval of at least 1000ms');
}
const fd = fs.openSync(outputPath, 'a');
const cpuCount = Math.max(1, os.cpus().length);
const ticksPerSecond = Number(execFileSync('getconf', ['CLK_TCK'], { encoding: 'utf8' }).trim()) || 100;
const latestDockerStats = new Map();
let previousClientProcesses = new Map();
let previousSampleAt = Date.now();
let dockerStatsError = '';
let stopping = false;

const dockerStats = spawn('docker', ['stats', '--format', '{{json .}}'], { stdio: ['ignore', 'pipe', 'pipe'] });
const statsLines = readline.createInterface({ input: dockerStats.stdout, crlfDelay: Infinity });
statsLines.on('line', line => {
    try {
        const row = parseDockerStatsLine(line);
        if (!row) return;
        latestDockerStats.set(row.Name || row.ID || row.Container, { row, sampledAtMs: Date.now() });
    } catch (error) {
        dockerStatsError = `invalid Docker stats row: ${error.message}`;
    }
});
dockerStats.stderr.on('data', chunk => {
    const diagnostic = chunk.toString().trim();
    if (diagnostic) dockerStatsError = diagnostic;
});
dockerStats.on('error', error => { dockerStatsError = error.message; });
dockerStats.on('exit', (code, signal) => {
    if (!stopping) dockerStatsError = `docker stats exited with code ${code ?? 'null'} and signal ${signal ?? 'none'}`;
});

function processDescendants(rootPid) {
    const queue = [{ pid: rootPid, inCaliperTree: false }];
    const visited = new Set([rootPid]);
    const result = [];
    while (queue.length) {
        const { pid, inCaliperTree } = queue.shift();
        let children;
        try {
            children = fs.readFileSync(`/proc/${pid}/task/${pid}/children`, 'utf8').trim().split(/\s+/).filter(Boolean).map(Number);
        } catch {
            continue;
        }
        for (const child of children) {
            if (!child || child === process.pid || visited.has(child)) continue;
            visited.add(child);
            let command = '';
            try { command = fs.readFileSync(`/proc/${child}/cmdline`, 'utf8').replaceAll('\0', ' '); }
            catch { continue; }
            if (/resource-sampler\.js/i.test(command) || /(?:^|\/)backend-api(?:\s|$)/i.test(command)) continue;
            const include = inCaliperTree || /caliper/i.test(command) || pid === rootPid;
            if (include) result.push(child);
            queue.push({ pid: child, inCaliperTree: include });
        }
    }
    return result;
}

function clientProcessMetrics(sampledAtMs) {
    const current = new Map();
    let cpuTicks = 0;
    let memoryBytes = 0;
    let readBytes = 0;
    let writeBytes = 0;
    let found = 0;
    for (const pid of processDescendants(runnerPid)) {
        try {
            const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf8');
            const fields = stat.slice(stat.lastIndexOf(')') + 2).split(/\s+/);
            const ticks = Number(fields[11]) + Number(fields[12]);
            const status = fs.readFileSync(`/proc/${pid}/status`, 'utf8');
            const rssKiB = Number(status.match(/^VmRSS:\s*(\d+)/m)?.[1] || 0);
            current.set(pid, { ticks, sampledAtMs });
            const previous = previousClientProcesses.get(pid);
            if (previous && sampledAtMs > previous.sampledAtMs) cpuTicks += Math.max(0, ticks - previous.ticks);
            memoryBytes += rssKiB * 1024;
            const io = fs.readFileSync(`/proc/${pid}/io`, 'utf8');
            readBytes += Number(io.match(/^read_bytes:\s*(\d+)/m)?.[1] || 0);
            writeBytes += Number(io.match(/^write_bytes:\s*(\d+)/m)?.[1] || 0);
            found++;
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }
    }
    previousClientProcesses = current;
    const elapsedSeconds = Math.max(0.001, (sampledAtMs - previousSampleAt) / 1000);
    previousSampleAt = sampledAtMs;
    if (!found) throw new Error(`Caliper client process was not found below runner PID ${runnerPid}`);
    const loopback = readLoopbackIO();
    const cpuPercent = (cpuTicks / ticksPerSecond / elapsedSeconds / cpuCount) * 100;
    return [
        {
            Name: 'caliper-network-namespace',
            CPUPerc: '0%',
            MemUsage: '0B / 0B',
            NetIO: `${loopback.receive}B / ${loopback.transmit}B`,
            BlockIO: '0B / 0B',
        },
        {
            Name: 'caliper-client',
            CPUPerc: `${cpuPercent.toFixed(3)}%`,
            MemUsage: `${memoryBytes}B / ${memoryBytes}B`,
            NetIO: `${loopback.receive}B / ${loopback.transmit}B`,
            BlockIO: `${readBytes}B / ${writeBytes}B`,
        },
    ];
}

function readLoopbackIO() {
    const line = fs.readFileSync('/proc/net/dev', 'utf8').split(/\r?\n/).find(item => item.trim().startsWith('lo:'));
    if (!line) return { receive: 0, transmit: 0 };
    const values = line.slice(line.indexOf(':') + 1).trim().split(/\s+/).map(Number);
    return { receive: values[0] || 0, transmit: values[8] || 0 };
}

function sample() {
    const sampledAtMs = Date.now();
    const sampledAt = new Date(sampledAtMs).toISOString();
    const errors = [];
    const containers = [...latestDockerStats.values()]
        .filter(item => sampledAtMs - item.sampledAtMs <= intervalMs * 2.5)
        .map(item => item.row);
    if (dockerStatsError) errors.push(`docker:${dockerStatsError}`);
    if (!containers.length) errors.push('docker:stats stream has not produced a container sample');
    try { containers.push(...clientProcessMetrics(sampledAtMs)); }
    catch (error) { errors.push(`process:${error.name || 'Error'}:${error.message || String(error)}`); }
    fs.writeSync(fd, `${JSON.stringify({ sampled_at: sampledAt, containers, ...(errors.length ? { sample_errors: errors } : {}) })}\n`);
}

sample();
const timer = setInterval(sample, intervalMs);
process.once('SIGTERM', () => {
    stopping = true;
    clearInterval(timer);
    dockerStats.kill('SIGTERM');
    fs.closeSync(fd);
    process.exit(0);
});
