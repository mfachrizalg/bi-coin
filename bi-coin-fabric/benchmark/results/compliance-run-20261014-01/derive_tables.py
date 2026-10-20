"""Derive Ch4 resource rows, per-workload latency rows, and capacity rows
for compliance-run-20261014-01 from summary.json and capacity.json.

Run from this folder: python3 -I derive_tables.py
Writes derived-tables.json next to the inputs. The output has no timestamps,
so repeated runs produce identical bytes.
"""
import collections
import hashlib
import json
import os
import statistics
from decimal import ROUND_HALF_UP, Decimal

HERE = os.path.dirname(os.path.abspath(__file__))
MIB = 1024 * 1024
MB = 1000 * 1000
SAMPLES_PER_WINDOW = 30
WINDOW_COUNT = 93  # 31 workloads x 3 confirmation rounds

# Ch4 resource table as printed (chapter-4.tex, tab:ch4-sumber-daya-kontrol):
# CPU rata-rata median (%), CPU puncak maks (%), Memori puncak maks (MiB), Delta RX median (MB).
CH4_RESOURCE = {
    'Peer Fabric centralbank': (1.59, 68.83, 154.2, 0.10),
    'Peer Fabric distributor': (1.44, 6.99, 154.1, 0.00),
    'Peer Fabric enduser': (1.44, 91.23, 160.8, 0.00),
    'Peer Fabric validator': (1.36, 70.99, 153.4, 0.09),
    'Orderer Fabric': (0.12, 1.52, 80.8, 0.00),
    'CouchDB': (4.02, 264.98, 253.8, 0.00),
    'Fabric CA': (0.00, 1.03, 28.9, 0.00),
    'PostgreSQL': (0.03, 0.79, 37.8, 0.00),
    'Kontainer chaincode': (0.31, 55.78, 248.0, 0.20),
    'Klien Caliper': (0.69, 17.98, 313.5, 1.84),
}
METRICS = ('cpu_mean_median_percent', 'cpu_peak_max_percent', 'memory_peak_max_mib', 'rx_delta_median_mb')
DECIMALS = (2, 2, 1, 2)
GROUP_ORDER = list(CH4_RESOURCE) + ['study-cli']  # study-cli is measured but absent from the Ch4 table
RESOURCE_KEYS = ('cpu_mean_percent', 'cpu_peak_percent', 'memory_peak_bytes', 'net_rx_delta_bytes')
NOTES = [
    'Resource rows: per confirmation window, sum each group instances. Then min, median, and max across the 93 windows for CPU mean, CPU peak, memory peak, and RX (spread). The Ch4 median and max values are the spread median and max.',
    'Group CPU and memory peaks add per-instance peaks. summary.json has no per-second series, so these are upper bounds on the peak of the summed series.',
    'Units: memory MiB = bytes / 2^20; RX MB = bytes / 10^6.',
    'caliper-network-namespace repeats the caliper-client RX/TX counters in every window. It is excluded, so Klien Caliper counts RX once.',
    'study-cli is measured but absent from the Ch4 table; its ch4 value is null.',
    'Latency: p50 = latency_ms.median and p95 = latency_ms.p95 per confirmation round. Workload value = median of its 3 rounds; ranges kept. Percentiles are not pooled.',
    'Capacity: first_failing_ops_per_second is null unless a measured probe (delivered_count present) failed at the recorded rate. fund-reserve recorded 0.195313 from a "fetch failed" probe; nearest measured failure is 0.21875.',
]


def fail(message):
    raise SystemExit('derive_tables.py: ' + message)


def load(name):
    with open(os.path.join(HERE, name), 'rb') as handle:
        raw = handle.read()
    return json.loads(raw), hashlib.sha256(raw).hexdigest()


def half_up(value, places):
    return float(Decimal(repr(value)).quantize(Decimal(1).scaleb(-places), rounding=ROUND_HALF_UP))


def summarize(values):
    return {
        'min': round(min(values), 6),
        'median': round(statistics.median(values), 6),
        'max': round(max(values), 6),
    }


def group_of(name):
    if name.startswith('dev-peer0.'):
        return 'Kontainer chaincode'
    if name.startswith('study-couchdb-'):
        return 'CouchDB'
    if name.startswith('study-peer0-'):
        return 'Peer Fabric ' + name[len('study-peer0-'):]
    if name.startswith('study-orderer-'):
        return 'Orderer Fabric'
    if name.startswith('study-ca-'):
        return 'Fabric CA'
    if name == 'study-postgres':
        return 'PostgreSQL'
    if name == 'caliper-client':
        return 'Klien Caliper'
    if name == 'study-cli':
        return 'study-cli'
    if name == 'caliper-network-namespace':
        return None  # repeats caliper-client RX/TX counters; excluded from sums
    fail('unmapped resource component: ' + name)


def probe_rate(probe):
    rate = probe.get('rate')
    return rate if rate is not None else probe.get('target_ops_per_second')


def main():
    summary, summary_sha = load('summary.json')
    capacity, capacity_sha = load('capacity.json')

    windows = sorted(
        (m for m in summary['measurements'] if m['phase'] == 'confirmation'),
        key=lambda m: (m['workload'], int(m['label'].rsplit('-', 1)[1])),
    )
    if len(windows) != WINDOW_COUNT:
        fail(f'expected {WINDOW_COUNT} confirmation windows, found {len(windows)}')
    for m in windows:
        res = m['resources']
        if not res['complete'] or res['sample_errors'] or res['sample_count'] != SAMPLES_PER_WINDOW:
            fail('incomplete resource window: ' + m['workload'] + ' ' + m['label'])

    resource_rows = []
    for label in GROUP_ORDER:
        member_sets = [
            sorted(n for n in m['resources']['components'] if group_of(n) == label) for m in windows
        ]
        if not member_sets[0] or any(s != member_sets[0] for s in member_sets):
            fail('instance set empty or varies across windows for ' + label)
        series = {key: [] for key in RESOURCE_KEYS}
        for m, names in zip(windows, member_sets):
            comps = m['resources']['components']
            for key in RESOURCE_KEYS:
                series[key].append(sum(comps[n][key] for n in names))
        cpu_mean = statistics.median(series['cpu_mean_percent'])
        cpu_peak = max(series['cpu_peak_percent'])
        mem_peak = max(series['memory_peak_bytes'])
        rx = statistics.median(series['net_rx_delta_bytes'])
        spread = {
            'cpu_mean_percent': summarize(series['cpu_mean_percent']),
            'cpu_peak_percent': summarize(series['cpu_peak_percent']),
            'memory_peak_mib': summarize([b / MIB for b in series['memory_peak_bytes']]),
            'rx_delta_mb': summarize([b / MB for b in series['net_rx_delta_bytes']]),
        }
        row = {
            'group': label,
            'instance_count': len(member_sets[0]),
            'instances': member_sets[0],
            'window_count': len(windows),
            'cpu_mean_median_percent': round(cpu_mean, 6),
            'cpu_peak_max_percent': round(cpu_peak, 6),
            'memory_peak_max_bytes': round(mem_peak, 6),
            'memory_peak_max_mib': round(mem_peak / MIB, 6),
            'rx_delta_median_bytes': round(rx, 6),
            'rx_delta_median_mb': round(rx / MB, 6),
            'spread': spread,
        }
        ch4 = CH4_RESOURCE.get(label)
        if ch4 is None:
            row['ch4'] = None
            row['ch4_mismatched_metrics'] = None
        else:
            raw = (cpu_mean, cpu_peak, mem_peak / MIB, rx / MB)
            row['ch4'] = dict(zip(METRICS, ch4))
            row['ch4_mismatched_metrics'] = [
                metric for metric, value, shown, nd in zip(METRICS, raw, ch4, DECIMALS)
                if half_up(value, nd) != shown
            ]
        resource_rows.append(row)

    dup = {
        'component': 'caliper-network-namespace',
        'duplicates': 'caliper-client',
        'windows': len(windows),
        'rx_equal_windows': 0,
        'tx_equal_windows': 0,
        'treatment': 'excluded from every group sum',
    }
    for m in windows:
        comps = m['resources']['components']
        ns, client = comps['caliper-network-namespace'], comps['caliper-client']
        dup['rx_equal_windows'] += int(ns['net_rx_delta_bytes'] == client['net_rx_delta_bytes'])
        dup['tx_equal_windows'] += int(ns['net_tx_delta_bytes'] == client['net_tx_delta_bytes'])

    by_workload = {}
    for m in windows:
        by_workload.setdefault(m['workload'], []).append(m)
    latency_rows = []
    for w in capacity['workloads']:
        rounds = by_workload.get(w['id'], [])
        if len(rounds) != 3:
            fail('expected 3 confirmation rounds for ' + w['id'])
        confirmed = w['highest_confirmed_passing_rate_ops_per_second']
        entries = []
        for m in rounds:
            if m['target_rate_ops_per_second'] != confirmed:
                fail('confirmation rate differs from confirmed rate: ' + w['id'])
            lat = m['latency_ms']
            usable = bool(lat.get('sample_count'))
            entries.append({
                'label': m['label'],
                'target_ops_per_second': m['target_rate_ops_per_second'],
                'p50_ms': lat.get('median') if usable else None,
                'p95_ms': lat.get('p95') if usable else None,
                'max_ms': lat.get('maximum') if usable else None,
                'sample_count': lat.get('sample_count'),
            })
        p50s = [e['p50_ms'] for e in entries]
        p95s = [e['p95_ms'] for e in entries]
        ok = None not in p50s and None not in p95s
        latency_rows.append({
            'workload': w['id'],
            'confirmed_ops_per_second': confirmed,
            'p50_ms': statistics.median(p50s) if ok else None,
            'p95_ms': statistics.median(p95s) if ok else None,
            'p50_range_ms': [min(p50s), max(p50s)] if ok else None,
            'p95_range_ms': [min(p95s), max(p95s)] if ok else None,
            'rounds': entries,
        })

    summary_by_id = {w['id']: w for w in summary['workloads']}
    disagree = []
    capacity_rows = []
    for w in capacity['workloads']:
        s = summary_by_id[w['id']]
        for key in ('highest_confirmed_passing_rate_ops_per_second', 'first_failing_rate_ops_per_second',
                    'remaining_interval_ops_per_second', 'capacity_boundary'):
            if s.get(key) != w.get(key):
                disagree.append(w['id'] + '.' + key)
        confirmed = w['highest_confirmed_passing_rate_ops_per_second']
        recorded = w['first_failing_rate_ops_per_second']
        measured = [p for p in w['search']['probes'] if p.get('delivered_count') is not None]
        failing = sorted({
            probe_rate(p) for p in measured
            if p.get('classification') == 'fail' and probe_rate(p) > confirmed
        })
        capacity_rows.append({
            'workload': w['id'],
            'chaincode': w['chaincode'],
            'transaction': w['transaction'],
            'operation_kind': w['operation_kind'],
            'family': w['family'],
            'rate_unit': s['rate_unit'],
            'confirmed_ops_per_second': confirmed,
            'first_failing_ops_per_second': recorded if recorded in failing else None,
            'first_failing_recorded_ops_per_second': recorded,
            'nearest_measured_failing_ops_per_second': failing[0] if failing else None,
            'confirmation_classification': w['confirmation']['classification'],
        })

    probe_counts = collections.Counter(
        str(p['resource'].get('sample_count')) if p.get('resource') else 'no_resource'
        for w in capacity['workloads'] for p in w['search']['probes']
    )
    checks = {
        'confirmation_windows': len(windows),
        'components_per_window': len(windows[0]['resources']['components']),
        'summary_capacity_disagreements': disagree,
        'capacity_rows_without_measured_first_failing': [
            r['workload'] for r in capacity_rows if r['first_failing_ops_per_second'] is None
        ],
        'resource_rows_mismatching_ch4': [r['group'] for r in resource_rows if r['ch4_mismatched_metrics']],
        'caliper_network_namespace': dup,
        'probe_resource_sample_counts': dict(sorted(probe_counts.items())),
    }
    out = {
        'study': summary['study'],
        'generated_by': 'derive_tables.py',
        'sources': {
            'summary.json': {'sha256': summary_sha},
            'capacity.json': {'sha256': capacity_sha},
        },
        'notes': NOTES,
        'resource_rows': resource_rows,
        'latency_rows': latency_rows,
        'capacity_rows': capacity_rows,
        'checks': checks,
    }
    with open(os.path.join(HERE, 'derived-tables.json'), 'w', encoding='utf-8', newline='\n') as handle:
        handle.write(json.dumps(out, indent=2) + '\n')


if __name__ == '__main__':
    main()
