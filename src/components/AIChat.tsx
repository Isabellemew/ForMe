import { useState, type ChangeEvent } from 'react';

interface Message {
  author: 'user' | 'ai';
  text: string;
}

function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { author: 'ai', text: 'Привет! Загрузите CV, опишите стажировку или спросите ИИ. Ответ генерируется с поддержкой Google Gemini.' },
  ]);
  const [draft, setDraft] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const addMessage = (message: Message) => setMessages((prev) => [...prev, message]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCvFile(file);
  };

  const handleSend = async () => {
    if (!draft.trim()) {
      return;
    }

    const question = draft.trim();
    addMessage({ author: 'user', text: question });
    setDraft('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, cvUploaded: Boolean(cvFile) }),
      });
      const data = await response.json();
      addMessage({ author: 'ai', text: data.answer });
    } catch (error) {
      addMessage({ author: 'ai', text: 'Ошибка сервера. Попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!cvFile) {
      addMessage({ author: 'ai', text: 'Пожалуйста, выберите файл CV перед загрузкой.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', cvFile);
    setLoading(true);

    try {
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      addMessage({ author: 'ai', text: data.summary });
    } catch (error) {
      addMessage({ author: 'ai', text: 'Ошибка загрузки CV. Попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '18px' }}>
        {messages.map((message, index) => (
          <div key={index} className={`message-row ${message.author}`}>
            <div className="bubble">{message.text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <label>
          Выберите CV (PDF/DOC):
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </label>
        <button className="button secondary" onClick={handleUpload} disabled={loading}>
          Загрузить CV
        </button>
        <textarea
          rows={4}
          placeholder="Опишите планируемую стажировку или спросите у ИИ..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="button" onClick={handleSend} disabled={loading}>
          {loading ? 'Обработка...' : 'Отправить в ИИ-чате'}
        </button>
      </div>
    </div>
  );
}

export default AIChat;
