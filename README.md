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

## Настройка Google Gemini API и Custom Search

### 1. Получить Google Gemini API ключ

1. Перейти на [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Создать новый API ключ
3. Скопировать ключ в `.env`:
   ```env
   GEMINI_API_KEY=<YOUR_API_KEY>
   ```

**Текущая модель:** `gemini-1.5-flash` (v1beta1 API)

**Если возникают ошибки 404:**
- Убедитесь, что у API ключа есть доступ к Gemini API
- Попробуйте модель `gemini-pro` вместо `gemini-1.5-flash`
- Проверьте, что аккаунт Google не ограничен

### 2. Создать Google Custom Search Engine

1. Перейти на [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Нажать "Create" и выбрать "Search the entire web"
3. В разделе "Sites to search" добавить:
   - cern.ch
   - mit.edu
   - ethz.ch
4. Скопировать **Search engine ID** (cx) из настроек
5. Заполнить `.env`:
   ```env
   SEARCH_API_KEY=<YOUR_GOOGLE_API_KEY>
   SEARCH_ENGINE_ID=<YOUR_SEARCH_ENGINE_ID>
   ```

**Статус:** Без `SEARCH_ENGINE_ID` приложение использует sample данные

### 3. Требуемые переменные .env

```env
# Google Gemini (обязательно для ИИ-чата)
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>

# Google Custom Search (обязательно для реальных стажировок)
SEARCH_API_KEY=<YOUR_GOOGLE_API_KEY>
SEARCH_ENGINE_ID=<YOUR_CUSTOM_SEARCH_ENGINE_ID>

# Firebase (опционально, текущая версия использует API fallback)
VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
VITE_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
VITE_FIREBASE_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_MESSAGING_SENDER_ID>
VITE_FIREBASE_APP_ID=<YOUR_APP_ID>
```

Также можно скопировать `.env.example` и заполнить ключи.

> Важно: сейчас приложение использует Google Gemini для генерации ответа и Google Custom Search API для сбора реальных стажировок. Gemini сам по себе не ищет в интернете без такого поискового слоя.


## Развитие

- Добавить реальный синхронный агент сбора стажировок
- Привязать Firestore коллекции `internships` и `professors`
- Усилить оценку шансов через модель ИИ
- Подключить реальные Google Gemini credentials для production

## Как адаптировать Gemini под проект

В этой версии Gemini используется через промпы. Чтобы сделать ассистента более «под свой проект»: 

- настроить контекст и шаблоны промпов; 
- хранить профиль пользователя и использовать его как дополнительное сообщение модели; 
- добавить собственную базу знаний / documents retrieval; 
- для реального fine-tuning воспользоваться Google Vertex AI Custom Model Training или embedding-based RAG, если нужно сохранять долгосрочную память.
