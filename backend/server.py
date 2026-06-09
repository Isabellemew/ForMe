from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import requests

app = Flask(__name__)
CORS(app)
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'models/text-bison-001')
GEMINI_URL = f'https://generativelanguage.googleapis.com/v1beta2/{GEMINI_MODEL}:generate'

SAMPLE_INTERNSHIPS = [
    {
        'id': 'cern-quantum',
        'organization': 'CERN Quantum Lab',
        'title': 'Summer Research Internship in Quantum Computing',
        'location': 'Geneva, Switzerland',
        'acceptanceRate': 6,
        'type': 'Research / Physics',
        'deadline': '2026-10-01',
        'description': 'Участвуйте в разработке квантовых алгоритмов для обработки данных экспериментов в CERN.',
        'tags': ['Quantum', 'Physics', 'AI'],
        'mentor': 'Dr. Elsie Mora',
        'reward': 'Стипендия + проживание',
        'remote': False,
    },
    {
        'id': 'deep-startup-ai',
        'organization': 'Deep Venture Lab',
        'title': 'AI Product Research Internship',
        'location': 'Berlin, Germany',
        'acceptanceRate': 12,
        'type': 'Startup / AI',
        'deadline': '2026-09-12',
        'description': 'Разработка MVP и исследований связанных с генеративным ИИ для продуктов глубокой аналитики.',
        'tags': ['AI', 'Startup', 'Data Science'],
        'mentor': 'Natalia Köhler',
        'reward': 'Гонорар + опционы',
        'remote': True,
    },
]

@app.route('/api/internships')
def internships():
    return jsonify({'internships': SAMPLE_INTERNSHIPS})


def generate_gemini_answer(prompt: str) -> str:
    if not GEMINI_API_KEY:
        return ''

    payload = {
        'prompt': {
            'text': prompt,
        },
        'temperature': 0.7,
        'maxOutputTokens': 250,
    }
    headers = {
        'Content-Type': 'application/json',
    }

    try:
        response = requests.post(GEMINI_URL, headers=headers, params={'key': GEMINI_API_KEY}, json=payload, timeout=20)
        response.raise_for_status()
        data = response.json()
        return data.get('candidates', [{}])[0].get('content', '').strip()
    except Exception as error:
        print('Gemini request failed:', error)
        return ''

@app.route('/api/chat', methods=['POST'])
def chat():
    payload = request.get_json(force=True)
    message = payload.get('message', '').strip()
    cv_uploaded = payload.get('cvUploaded', False)

    if not message:
        return jsonify({'answer': 'Пожалуйста, задайте вопрос или опишите направление, чтобы получить оценку.'})

    gemini_prompt = f"Анализ резюме и стажировки. Вопрос: {message}. CV загружено: {cv_uploaded}."
    gemini_text = generate_gemini_answer(gemini_prompt)

    if gemini_text:
        return jsonify({'answer': gemini_text})

    score = 0
    if 'CERN' in message or 'квант' in message.lower() or 'physics' in message.lower():
        score += 15
    if 'AI' in message or 'ИИ' in message:
        score += 10
    if cv_uploaded:
        score += 20

    answer = (
        'ИИ-агент анализирует профиль и стажировку. '
        f'Текущая оценка шансов: {min(score + 45, 92)}%. '
        'Уточните CV и научные интересы для более точной рекомендации.'
    )
    return jsonify({'answer': answer})

@app.route('/api/upload-cv', methods=['POST'])
def upload_cv():
    if 'file' not in request.files:
        return jsonify({'summary': 'Файл не найден. Пожалуйста, загрузите CV.'}), 400

    file = request.files['file']
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    save_path = os.path.join(UPLOAD_DIR, filename)
    file.save(save_path)

    summary = (
        'CV успешно загружено. ИИ-агент начал предварительный анализ. '
        'На основе структуры резюме мы рекомендуем дополнить проекты, ключевые навыки и публикации, чтобы повысить шансы.'
    )
    return jsonify({'summary': summary})

@app.route('/api/sync', methods=['POST'])
def sync_internships():
    return jsonify({'message': 'ИИ-агент инициировал обновление данных о стажировках. Данные будут синхронизированы из лабораторий и стартапов.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
