'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Send, Bot, User, Sparkles, MessageCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  'Should I buy Mesh WiFi?',
  'Which OTT bundle is best for my family?',
  'Why are you recommending CCTV?',
  'How much can I save with the bundle?',
  'Why these specific recommendations?',
  'How can I improve my home score?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content:
        "Hi! I'm DigiTel Nexus AI, your Digital Home Advisor. I can help you understand your recommendations, compare products, or answer any questions about your digital home. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [assessment, setAssessment] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const assData = localStorage.getItem('digitel-assessment');
    const recData = localStorage.getItem('digitel-recommendations');
    if (assData) setAssessment(JSON.parse(assData));
    if (recData) setRecommendations(JSON.parse(recData));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          assessment: assessment || {},
          recommendations: recommendations || {},
          history: messages.map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: data.reply || 'Sorry, I could not process that. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'Sorry, there was a connection error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="orb w-[400px] h-[400px] bg-cyan-600 top-[-100px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-purple-600 bottom-[100px] left-[-100px]" />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full pt-20 pb-4 px-4">
        {/* Header */}
        <div className="py-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                DigiTel Nexus AI
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h1>
              <p className="text-xs text-slate-400">Your Digital Home Advisor</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 ${
                  msg.role === 'user' ? 'chat-user' : 'chat-ai'
                }`}
              >
                <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p suppressHydrationWarning className="text-[10px] text-white/40 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-ai px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="py-3">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="pt-3 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your digital home..."
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="glow-button px-4 py-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
