"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: Product[];
}
type SpeechRecognitionType = {
  start: () => void;
  stop: () => void;
  onstart?: () => void;
  onresult?: (event: SpeechRecognitionType) => void;
  onerror?: (event: { error: string }) => void;
  onend?: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
};


export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null);
  const [voiceError, setVoiceError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Estado del widget (cerrado por defecto)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Función para convertir URLs en enlaces clickables
  const renderMessageWithLinks = (content: string) => {
    // Regex para detectar URLs (http, https, wa.me, etc.)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline break-all"
            style={{ color: '#2563eb', textDecoration: 'underline' }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Inicializar reconocimiento de voz
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWithSpeech = window as Window & typeof globalThis & {
        SpeechRecognition?: new () => SpeechRecognitionType;
        webkitSpeechRecognition?: new () => SpeechRecognitionType;
      };

      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'es-ES';
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onstart = () => {
          console.log('Reconocimiento de voz iniciado');
        };

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setVoiceError('');
        };

        recognitionInstance.onerror = (event: { error: string }) => {
          console.error('Error de reconocimiento:', event.error);
          setIsRecording(false);

          // Mostrar mensaje de error más específico
          if (event.error === 'network') {
            setVoiceError('Error de conexión. Verifica tu internet e intenta de nuevo.');
            // No mostrar alert, solo log
            console.warn('⚠️ Error de red al conectar con el servicio de reconocimiento de voz de Google.');
            console.warn('💡 Asegúrate de tener conexión a internet estable.');
          } else if (event.error === 'no-speech') {
            setVoiceError('No se detectó voz. Intenta de nuevo hablando más cerca del micrófono.');
          } else if (event.error === 'not-allowed') {
            setVoiceError('Debes permitir el acceso al micrófono.');
            alert('Por favor, permite el acceso al micrófono en tu navegador para usar esta función.');
          } else if (event.error === 'aborted') {
            setVoiceError('');
          } else {
            setVoiceError(`Error: ${event.error}`);
          }
        };

        // recognitionInstance.onend = () => {
        //   console.log('Reconocimiento de voz finalizado');
        //   setIsRecording(false);
        // };

        // setRecognition(recognitionInstance);
      }
    }
  }, []);

  // Cerrar el chatbot con la tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Auto-focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Ajustar vista cuando aparece el teclado en móvil
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      // En móvil, cuando el teclado aparece, window.visualViewport cambia
      if (typeof window !== 'undefined' && window.visualViewport) {
        const viewport = window.visualViewport;
        document.documentElement.style.setProperty('--viewport-height', `${viewport.height}px`);
      }
    };

    const handleFocus = () => {
      // Cuando el input recibe foco, hacer scroll para que sea visible
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    }

    inputRef.current?.addEventListener('focus', handleFocus);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
      inputRef.current?.removeEventListener('focus', handleFocus);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Iniciar/detener grabación de audio
  const toggleRecording = () => {
    if (!recognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.');
      return;
    }

    if (isRecording) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error al detener grabación:', error);
      }
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error al iniciar grabación:', error);
        setIsRecording(false);
        alert('No se pudo iniciar el reconocimiento de voz. Asegúrate de que tu micrófono esté conectado y permitido.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error');

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        images: data.images || undefined
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error al procesar tu mensaje.' }]);
    } finally {
      setIsLoading(false);
      // Mantener el foco en el input después de enviar
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const GeminiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#9b72cb" />
          <stop offset="100%" stopColor="#d96570" />
        </linearGradient>
      </defs>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#g)" />
    </svg>
  );

  const RobotIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 8V4H8"></path>
      <rect width="16" height="12" x="4" y="8" rx="2"></rect>
      <path d="M2 14h2"></path>
      <path d="M20 14h2"></path>
      <path d="M15 13v2"></path>
      <path d="M9 13v2"></path>
    </svg>
  );

  return (
    <>
      {/* Botón flotante para abrir/cerrar el chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 w-12 h-12 bottom-14 sm:bottom-8 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 hover:cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #004899 0%, #0076f6 100%)',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
        title="Chat con Alloatti SRL"
      >
        <RobotIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </button>

      {/* Widget del chat con animación - Responsivo */}
      <div
        className="fixed transition-all duration-300 ease-out z-50 chatbot-widget"
        style={{
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col h-full overflow-hidden chatbot-container" style={{ background: 'var(--gemini-bg)' }}>
          <header
            className="border-b flex items-center justify-between px-4 py-3 sm:py-3"
            style={{
              background: 'linear-gradient(135deg, #004899 0%, #0076f6 100%)',
              borderColor: 'transparent',
              minHeight: '56px'
            }}
          >
            <div className="flex items-center gap-1.5">
              <RobotIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <h1 className="text-base sm:text-lg font-semibold text-white tracking-wide">Alloatti</h1>
              <p className="text-[10px] text-white opacity-85 text-nowrap bg-white/10 px-2 py-0.5 rounded-full font-medium">Gemini AI</p>
              <GeminiIcon />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/25 hover:bg-opacity-20 flex items-center justify-center transition-colors flex-shrink-0 hover:cursor-pointer"
              title="Cerrar chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <main className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 py-8">
                <div className="mb-4 animate-pulse text-[#0052cc]">
                  <RobotIcon className="w-14 h-14 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-center" style={{ color: 'var(--gemini-text)' }}>Asistente técnico y comercial</h2>
                <p className="text-xs sm:text-sm text-center max-w-sm leading-relaxed" style={{ color: 'var(--gemini-text-secondary)' }}>
                  Asesoramiento directo sobre maquinaria industrial de lavado, llenado y tapado de bidones (estándares IVESS/CIMES). Solicite cotizaciones y especificaciones técnicas aquí.
                </p>
              </div>
            ) : (
              <div className="px-3 sm:px-4 py-4 sm:py-6">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-5 sm:mb-6 flex gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center animate-fade-in" style={{ background: msg.role === 'user' ? 'var(--gemini-user-bg)' : 'transparent' }}>
                      {msg.role === 'user' ? <span className="text-xs font-semibold" style={{ color: 'var(--gemini-user-text)' }}>U</span> : <RobotIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052cc]" />}
                    </div>
                    <div className="flex-1 pt-0.5 sm:pt-1 min-w-0">
                      <div className="text-xs font-semibold mb-1 uppercase tracking-wider opacity-70" style={{ color: 'var(--gemini-text-secondary)' }}>{msg.role === 'user' ? 'Cliente' : 'Alloatti'}</div>
                      <div className="whitespace-pre-wrap leading-relaxed text-sm break-words" style={{ color: 'var(--gemini-text)' }}>
                        {renderMessageWithLinks(msg.content)}
                      </div>

                      {/* Mostrar galería de productos si existen */}
                      {msg.images && msg.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {msg.images.map((product) => (
                            <div
                              key={product.id}
                              className="border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                              style={{ borderColor: 'var(--gemini-border)', background: 'var(--gemini-surface)' }}
                            >
                              <div>
                                <div className="relative w-full h-28 sm:h-32 bg-gray-100">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 400px"
                                  />
                                </div>
                                <div className="p-3">
                                  <h3 className="font-bold text-sm mb-1 line-clamp-1" style={{ color: 'var(--gemini-text)' }}>
                                    {product.name}
                                  </h3>
                                  <p className="text-xs mb-1 line-clamp-2" style={{ color: 'var(--gemini-text-secondary)' }}>
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                              <div className="p-3 pt-0 flex justify-between items-center border-t border-dashed" style={{ borderColor: 'var(--gemini-border)' }}>
                                <p className="font-extrabold text-sm" style={{ color: '#0052cc' }}>
                                  {product.price}
                                </p>
                                <a
                                  href={`https://wa.me/5491168641122?text=Hola!%20Vengo%20del%20chatbot%20e%20interesaría%20solicitar%20una%20cotización%20técnico-comercial%20del%20modelo%20${encodeURIComponent(product.name)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] bg-[#0052cc] text-white px-2.5 py-1 rounded-md font-bold hover:bg-[#0046a0] transition-colors"
                                >
                                  Cotizar
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-5 sm:mb-6 flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                      <RobotIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052cc]" />
                    </div>
                    <div className="flex-1 pt-0.5 sm:pt-1">
                      <div className="text-xs font-semibold mb-1 opacity-70" style={{ color: 'var(--gemini-text-secondary)' }}>Alloatti</div>
                      <div className="flex gap-1.5 items-center mt-1">
                        {[0, 0.2, 0.4].map((delay, i) => (<div key={i} className="w-2.5 h-2.5 rounded-full bg-blue-500/70 animate-bounce" style={{ animationDelay: `${delay}s` }}></div>))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </main>
          <footer className="border-t safe-area-bottom shadow-lg" style={{ background: 'var(--gemini-surface)', borderColor: 'var(--gemini-border)' }}>
            <div className="px-3 sm:px-4 py-2.5 sm:py-3">
              {/* Mostrar error de voz si existe */}
              {voiceError && (
                <div className="mb-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                  ⚠️ {voiceError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex items-end gap-1.5 sm:gap-2 rounded-full sm:rounded-3xl border" style={{ borderColor: 'var(--gemini-border)', background: 'var(--gemini-bg)' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setVoiceError(''); // Limpiar error al escribir
                    }}
                    placeholder={isRecording ? 'Escuchando...' : 'Escribe tu consulta técnica...'}
                    disabled={isLoading || isRecording}
                    className="flex-1 bg-transparent outline-none px-4 py-2.5 text-sm min-w-0"
                    style={{ color: 'var(--gemini-text)' }}
                  />

                  <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="mr-1.5 sm:mr-2 p-2 rounded-full transition-all disabled:opacity-50 flex-shrink-0"
                    style={{ background: message.trim() && !isLoading ? '#0052cc' : 'transparent' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" className="sm:w-5 sm:h-5"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill={message.trim() && !isLoading ? '#fff' : 'var(--gemini-text-secondary)'} /></svg>
                  </button>
                </div>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
