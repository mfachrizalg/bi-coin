#!/usr/bin/env python3
"""Render activity-diagrams.puml → 10 individual PNG files for LaTeX inclusion.
Run from bi-coin/ project root:
    python3 render-activity-diagrams.py
"""
import re
import os
import subprocess

PUML_SRC = 'bi-coin-fabric/docs/diagrams/plantuml/activity-diagrams.puml'
OUT_DIR   = 'thesis/contents/figures/activity'

NAMES = [
    'AD01-Pendaftaran-Peserta',
    'AD02-Penerbitan-Digital-Rupiah',
    'AD03-Distribusi-Likuiditas-PJP',
    'AD04-Onboarding-KYC-Pelanggan',
    'AD05-Transfer-Saldo-Ritel',
    'AD06-Pembayaran-QRIS',
    'AD07-Pembayaran-NFC-Offline',
    'AD08-Pembekuan-Peserta',
    'AD09-Resolusi-Gridlock',
    'AD10-Laporan-Supervisi',
]

os.makedirs(OUT_DIR, exist_ok=True)

with open(PUML_SRC, encoding='utf-8') as f:
    content = f.read()

blocks = re.findall(r'@startuml[\s\S]*?@enduml', content)
if len(blocks) != 10:
    print(f'WARNING: expected 10 diagrams, found {len(blocks)}')

out_abs = os.path.abspath(OUT_DIR)

for name, block in zip(NAMES, blocks):
    # Inject 300 DPI for print quality
    block_hires = block.replace('@startuml', '@startuml\nskinparam dpi 300', 1)
    tmp = f'/tmp/{name}.puml'
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(block_hires)

    result = subprocess.run(
        ['plantuml', '-tpng', '-o', out_abs, tmp],
        capture_output=True, text=True
    )
    out_file = os.path.join(out_abs, f'{name}.png')
    if os.path.exists(out_file):
        size = os.path.getsize(out_file)
        print(f'OK   {name}.png  ({size:,} bytes)')
    else:
        print(f'FAIL {name}')
        if result.stderr:
            print('     ', result.stderr[:200])
