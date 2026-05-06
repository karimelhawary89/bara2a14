import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Maximize2, Minimize2, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function BaraaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'مرحباً بك! أنا براءة، مساعدك القانوني الذكي. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'general',
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.content };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      toast.error('عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي');
      console.error(error);
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[2000] font-tajawal">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-nm-accent-gold text-[#1e293b] flex items-center justify-center nm-raised hover:scale-110 transition-transform shadow-2xl relative group"
          >
             <div className="absolute inset-0 rounded-full bg-nm-accent-gold animate-ping opacity-20" />
            <Bot className="w-8 h-8 relative z-10" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-nm-bg">1</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={cn(
              "bg-nm-bg nm-raised rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
              isExpanded ? "w-[600px] h-[700px]" : "w-[380px] h-[550px]"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-[#1e293b] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-nm-accent-gold flex items-center justify-center nm-raised shadow-none">
                  <Bot className="w-6 h-6 text-[#1e293b]" />
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-sm">براءة AI</h3>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                     متصل الآن
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/30 backdrop-blur-sm">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "mr-auto items-end" : "ml-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-nm-accent-gold text-[#1e293b] nm-raised rounded-tr-none" 
                      : "bg-white text-nm-text-primary nm-raised rounded-tl-none border border-gray-100"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-nm-text-muted mt-1 px-1">
                    {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-nm-text-muted">
                   <div className="flex gap-1 nm-inset p-2 rounded-xl bg-white/50">
                      <div className="w-1.5 h-1.5 bg-nm-accent-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-nm-accent-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-nm-accent-gold rounded-full animate-bounce" />
                   </div>
                   <span className="text-[10px] font-bold">براءة تفكر...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-nm-bg border-t border-white/20">
              <div className="flex items-center gap-2 mb-2 px-1">
                 <button className="text-nm-text-muted hover:text-nm-accent-gold transition-colors">
                    <Paperclip className="w-4 h-4" />
                 </button>
                 <span className="text-[10px] text-nm-text-muted">استخدمت 1 من 15 رسالة مجانية اليوم</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك القانوني..."
                  className="flex-1 nm-input py-2 text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    input.trim() && !isLoading 

                      ? "bg-nm-accent-gold text-[#1e293b] nm-raised" 
                      : "bg-gray-300 text-gray-400 opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send className={cn("w-5 h-5", input.trim() && "animate-pulse")} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
