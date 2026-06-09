# ForMe — Платформа стажировок и оценки шансов

## Что сделано

- React + TypeScript фронтенд с `src/pages/Home.tsx`, `src/pages/InternshipCard.tsx`, `src/pages/Professors.tsx`
- Компоненты `src/components/InternshipList.tsx` и `src/components/AIChat.tsx`
- Firebase Firestore-интеграция в `src/firebase.ts` и `src/services/firebaseService.ts`
- Python Flask API в `backend/server.py` для обработки чата и загрузки CV
- Структура для запуска ИИ-агента сбора данных в `backend/agent.py`

## Как запустить

1. Установите зависимости фронтенда:

```bash
npm install
```

2. Установите зависимости Python-бэкенда:

```bash
python -m pip install -r backend/requirements.txt
```

3. Запустите Flask-сервер:

```bash
python backend/server.py
```

4. Запустите фронтенд:

```bash
npm run dev
```

5. Откройте `http://localhost:5173`

## Настройка Firebase и Google Gemini

Создайте проект Firebase и заполните переменные окружения в `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
GEMINI_API_KEY=...
GEMINI_MODEL=models/text-bison-001
```

Также можно скопировать `.env.example` и заполнить ключи.

## Развитие

- Добавить реальный синхронный агент сбора стажировок
- Привязать Firestore коллекции `internships` и `professors`
- Усилить оценку шансов через модель ИИ
- Подключить реальные Google Gemini credentials для production
