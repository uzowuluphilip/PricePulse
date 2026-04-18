import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import api from '../../services/api.js';

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'Find me the cheapest iPhone',
    'Is now a good time to buy a MacBook?',
    'Which headphones have the best deal today?',
    'Alert me when AirPods drop below $180',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', {
        message: userMessage,
        conversationHistory: messages
          .slice(-6)
          .map(m => ({
            role:    m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
      });

      const aiMsg = {
        id: Date.now() + 1,
        text:      res.data.reply,
        sender:    'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      console.error('AI chat error:', err);
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Sorry, I am having trouble connecting right now. Please try again!',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary
          text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110
          transition-all flex items-center justify-center group z-40"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-dark-card border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-40 max-w-[calc(100vw-24px)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-white text-sm">PricePulse AI</h3>
            <p className="text-xs text-gray-400">Ask me anything about prices</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-700 rounded-lg transition-all"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Sparkles className="w-8 h-8 text-gray-600" />
            <p className="text-sm text-gray-400 text-center">
              Ask me anything about product prices!
            </p>
            <div className="w-full space-y-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-700
                    text-gray-300 hover:text-white text-xs rounded-lg
                    transition-all text-left line-clamp-2"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-300 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg rounded-bl-none px-3 py-3">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isTyping) {
                sendMessage(input);
              }
            }}
            placeholder="Ask me anything..."
            disabled={isTyping}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2
              text-sm text-white placeholder-gray-500 focus:outline-none
              focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-primary hover:bg-blue-700 disabled:opacity-50
              text-white rounded-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
