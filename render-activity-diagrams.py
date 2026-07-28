#!/usr/bin/env python3
"""Render named PlantUML activity diagrams used by the thesis.

Run from bi-coin/ project root:
    python3 render-activity-diagrams.py
"""
import os
import re
import subprocess
import tempfile

PUML_SRC = 'bi-coin-fabric/docs/diagrams/plantuml/activity-diagrams.puml'
OUT_DIR   = 'thesis/contents/figures/activity'

REQUIRED_NAMES = [
    'AD01-Pendaftaran-Peserta',
    'AD02-Penerbitan-Digital-Rupiah',
    'AD03-Distribusi-Likuiditas-PJP',
    'AD04-Onboarding-KYC-Pelanggan',
    'AD05-Transfer-Saldo-Ritel',
    'AD08-Pembekuan-Peserta',
    'AD10-Laporan-Supervisi',
]

BLOCK_PATTERN = re.compile(
    r'@startuml[ \t]+(?P<name>[A-Za-z0-9-]+)[^\n]*\n'
    r'(?P<body>[\s\S]*?)@enduml'
)


def parse_named_diagrams(content):
    diagrams = {}
    for match in BLOCK_PATTERN.finditer(content):
        name = match.group('name')
        if name in diagrams:
            raise ValueError(f'duplicate diagram name: {name}')
        diagrams[name] = f"@startuml\n{match.group('body')}@enduml\n"

    missing = [name for name in REQUIRED_NAMES if name not in diagrams]
    if missing:
        raise ValueError(f"missing required diagrams: {', '.join(missing)}")
    return diagrams


def render_diagrams(diagrams):
    os.makedirs(OUT_DIR, exist_ok=True)
    out_abs = os.path.abspath(OUT_DIR)

    with tempfile.TemporaryDirectory(prefix='bi-coin-activity-') as tmp_dir:
        for name in REQUIRED_NAMES:
            source = diagrams[name].replace(
                '@startuml',
                '@startuml\nskinparam dpi 300',
                1,
            )
            tmp = os.path.join(tmp_dir, f'{name}.puml')
            with open(tmp, 'w', encoding='utf-8') as source_file:
                source_file.write(source)

            result = subprocess.run(
                ['plantuml', '-tpng', '-o', out_abs, tmp],
                capture_output=True,
                text=True,
                check=False,
            )
            out_file = os.path.join(out_abs, f'{name}.png')
            if result.returncode != 0 or not os.path.exists(out_file):
                detail = result.stderr.strip()[:300] or 'output file not created'
                raise RuntimeError(f'failed to render {name}: {detail}')

            size = os.path.getsize(out_file)
            print(f'OK   {name}.png  ({size:,} bytes)')


def main():
    with open(PUML_SRC, encoding='utf-8') as source_file:
        diagrams = parse_named_diagrams(source_file.read())
    render_diagrams(diagrams)


if __name__ == '__main__':
    main()
