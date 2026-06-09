import json
import os

OUT_FILE = os.path.join(os.path.dirname(__file__), 'internships.json')

SAMPLE_SOURCES = [
    {
        'name': 'CERN public data',
        'url': 'https://example.com/cern-internships',
    },
    {
        'name': 'Startup opportunities',
        'url': 'https://example.com/startup-internships',
    },
]


def gather_internships():
    items = []
    for source in SAMPLE_SOURCES:
        items.append({
            'source': source['name'],
            'title': f"Автоматически собранная стажировка из {source['name']}",
            'organization': source['name'],
            'acceptanceRate': 10,
            'deadline': '2026-12-01',
        })

    with open(OUT_FILE, 'w', encoding='utf-8') as out:
        json.dump({'internships': items}, out, ensure_ascii=False, indent=2)

    print('Данные стажировок обновлены:', OUT_FILE)


if __name__ == '__main__':
    gather_internships()
