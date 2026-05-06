import { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, Paperclip, Mic, Search, 
  RotateCcw, History, Sparkles, Languages, Gavel, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const MODES = [
  { id: 'general', title: 'تحليل قانوني', icon: Gavel, prompt: 'أنت مساعد قانوني متخصص في البحث في القانون المصري.' },
  { id: 'draft', title: 'صياغة ذكية', icon: FileText, prompt: 'أنت محامٍ خبير في صياغة العقود والوثائق القانونية.' },
  { id: 'translate', title: 'ترجمة فورية', icon: Languages, prompt: 'أنت مترجم قانوني معتمد تترجم بين العربية والإنجليزية.' },
  { id: 'summarize', title: 'تبسيط قانوني', icon: Sparkles, prompt: 'أنت خبير في تبسيط النصوص القانونية المعقدة لعامة الناس.' },
];

export default function AIAssistant() {
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [conversations, setConversations] = useState<Message[][]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'مرحباً بك في المساعد القانوني براءة. كيف يمكنني مساعدتك في شؤونك القانونية اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeMode.id,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) throw new Error('AI Error');
      const data = await response.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.content }]);
    } catch (error) {
      toast.error('فشل الاتصال بـ براءة AI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8 font-tajawal">
      
      {/* History Sidebar */}
      <div className="hidden lg:flex w-72 flex-col gap-6">
        <div className="nm-card flex-1 flex flex-col p-6 overflow-hidden">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold font-cairo flex items-center gap-2">
                 <History className="w-4 h-4 text-purple-500" />
                 السجلات
              </h3>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 hover:nm-pressed rounded-lg text-nm-text-muted transition-all"
              >
                 <RotateCcw className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {['استشارة عقار النزهة', 'مراجعة عقد توريد', 'طلب إذن نيابة', 'رأي في دعوى عمل'].map((h, i) => (
                <div key={i} className="p-3 bg-nm-bg hover:nm-inset rounded-xl cursor-pointer group transition-all">
                   <p className="text-xs font-semibold text-[#1e293b] truncate">{h}</p>
                   <p className="text-[10px] text-nm-text-muted mt-1 uppercase">منذ 3 ساعات</p>
                </div>
              ))}
           </div>

           <div className="mt-6 pt-6 border-t border-white/20">
              <button className="w-full nm-button bg-nm-accent-gold text-[#1e293b] border-none font-bold py-3">
                 محادثة جديدة +
              </button>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Mode Selector */}
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode)}
              className={cn(
                "flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl font-cairo text-sm font-bold transition-all snap-start",
                activeMode.id === mode.id 
                  ? "bg-white nm-raised text-purple-600 border-b-2 border-purple-500" 
                  : "bg-nm-bg text-nm-text-muted hover:text-[#1e293b]"
              )}
            >
              <mode.icon className="w-4 h-4" />
              <span>{mode.title}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="nm-card flex-1 flex flex-col p-0 overflow-hidden bg-white/30 backdrop-blur-md">
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-4 max-w-[90%]",
                    msg.role === 'user' ? "mr-auto flex-row-reverse" : "ml-auto"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl nm-raised flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-nm-accent-gold" : "bg-white border border-gray-100"
                  )}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-[#1e293b]" /> : <Bot className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className={cn(
                    "p-5 rounded-3xl text-sm leading-loose shadow-sm",
                    msg.role === 'user' 
                      ? "bg-nm-accent-gold text-[#1e293b] rounded-tr-none" 
                      : "bg-white text-nm-text-primary rounded-tl-none nm-raised"
                  )}>
                    <div className="prose prose-sm whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 ml-auto items-center">
                   <div className="w-10 h-10 rounded-2xl nm-raised bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                      <Bot className="w-5 h-5 text-purple-400 animate-spin" />
                   </div>
                   <div className="bg-white nm-raised p-4 rounded-3xl rounded-tl-none border border-gray-100">
                      <div className="flex gap-2">
                         <div className="w-2 h-2 bg-purple-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
                         <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                         <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      </div>
                   </div>
                </div>
              )}
           </div>

           {/* Input Bar */}
           <div className="p-6 bg-nm-bg/80 border-t border-white/20">
              {messages.length === 1 && (
                 <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in slide-in-from-bottom-2">
                    {['ما شروط فسخ العقد؟', 'لخص هذا المستند', 'اصغ بند عدم منافسة', 'مواعيد الاستئناف؟'].map(q => (
                       <button 
                         key={q} 
                         onClick={() => handleSend(q)}
                         className="px-4 py-2 bg-white/50 nm-inset rounded-xl text-xs font-bold text-nm-text-muted hover:text-nm-accent-gold transition-colors"
                       >
                          {q}
                       </button>
                    ))}
                 </div>
              )}
              <div className="flex items-end gap-4">
                 <div className="flex-1 nm-inset bg-white p-2 rounded-2xl flex items-center gap-2">
                    <button className="p-3 hover:bg-gray-50 rounded-xl text-nm-text-muted">
                       <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                      placeholder="اكتب رسالتك هنا... (Shift + Enter لسطر جديد)"
                      rows={1}
                      className="flex-1 bg-transparent border-none outline-none resize-none p-2 text-sm max-h-40"
                    />
                    <button className="p-3 hover:bg-gray-50 rounded-xl text-nm-accent-gold">
                       <Mic className="w-5 h-5" />
                    </button>
                 </div>
                 <button 
                   onClick={() => handleSend()}
                   disabled={!input.trim() || isLoading}
                   className={cn(
                     "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0",
                     input.trim() && !isLoading ? "bg-nm-accent-gold nm-raised text-[#1e293b]" : "bg-gray-200 text-gray-400 opacity-50"
                   )}
                 >
                    <Send className="w-6 h-6" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
