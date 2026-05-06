import { useState } from 'react';
import { 
  Brain, Shield, FileText, Scale, AlertCircle, FileCheck, 
  Zap, Search, Gavel, CalendarClock, Calculator, Share2, 
  Mic, Trash2, Copy, Download, ChevronLeft, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const WIDGETS = [
  { id: 'cassation', title: 'محرك أحكام النقض', icon: Scale, category: 'تحليل', color: 'text-blue-500', desc: 'البحث والتحليل في مبادئ محكمة النقض المصرية' },
  { id: 'risk', title: 'محلل مخاطر العقود', icon: Brain, category: 'مراجعة', color: 'text-red-500', desc: 'كشف الثغرات والبنود الخطرة في العقود' },
  { id: 'sharia', title: 'الامتثال الشرعي', icon: Shield, category: 'مراجعة', color: 'text-green-500', desc: 'التحقق من خلو العقود من الربا والغرر' },
  { id: 'draft', title: 'صياغة بنود ذكية', icon: FileText, category: 'صياغة', color: 'text-nm-accent-gold', desc: 'إنشاء بنود قانونية مخصصة ومحكمة' },
  { id: 'detention', title: 'مواعيد الحبس الاحتياطي', icon: CalendarClock, category: 'جنائي', color: 'text-purple-500', desc: 'حساب مدد الحبس والافراج الوجوبي' },
  { id: 'fees', title: 'حاسبة الرسوم القضائية', icon: Calculator, category: 'مالي', color: 'text-orange-500', desc: 'تقدير رسوم المحاكم المصرية بدقة' },
  { id: 'warrant', title: 'صياغة أذون التفتيش', icon: Gavel, category: 'صياغة', color: 'text-gray-700', desc: 'توليد طلبات قانونية مطابقة للمعايير' },
  { id: 'labor', title: 'امتثال قانون العمل', icon: FileCheck, category: 'امتثال', color: 'text-teal-500', desc: 'مراجعة عقود العمل وفق القانون 12/2003' },
  { id: 'eviction', title: 'تتبع دعاوى الإخلاء', icon: Trash2, category: 'عقاري', color: 'text-red-600', desc: 'إجراءات ومواعيد إنهاء العقود الإيجارية' },
  { id: 'demand', title: 'إنذارات رسمية', icon: Share2, category: 'صياغة', color: 'text-blue-400', desc: 'صياغة إنذارات وفاء أو إخلال قانونية' },
  { id: 'evidence', title: 'سجل حرز الأدلة', icon: Search, category: 'إجراءات', color: 'text-indigo-500', desc: 'تتبع سلسلة الحيازة للأدلة الجنائية' },
  { id: 'outcome', title: 'توقع نتائج القضايا', icon: Zap, category: 'توقع', color: 'text-yellow-500', desc: 'تحليل احتمالية كسب القضية بناء على المعطيات' },
];

export default function AILegal() {
  const [selectedWidget, setSelectedWidget] = useState<typeof WIDGETS[0] | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalize = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai-proxy', {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: selectedWidget?.id === 'draft' ? 'draft' : 'review',
          messages: [{ role: 'user', content: `Widget: ${selectedWidget?.title}\n\nInput: ${inputText}` }]
        }),
      });

      if (!response.ok) throw new Error('AI Error');
      const data = await response.json();
      setResult(data.content);
    } catch (error) {
      toast.error('حدث خطأ أثناء التحليل بالذكاء الاصطناعي');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">محرك براءة AI</h1>
          <p className="text-nm-text-muted mt-1">ذكاء اصطناعي قانوني متخصص للقانون المصري</p>
        </div>
        {!selectedWidget && (
          <div className="flex items-center gap-2 bg-nm-bg nm-inset px-4 py-2 rounded-xl">
             <Brain className="w-5 h-5 text-purple-600 animate-pulse" />
             <span className="text-xs font-bold font-cairo text-purple-600 tracking-wide">المنصة متصلة بـ GPT-4o</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedWidget ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {WIDGETS.map((widget) => (
              <div 
                key={widget.id}
                onClick={() => setSelectedWidget(widget)}
                className="nm-card cursor-pointer group hover:nm-pressed transition-all flex flex-col items-center text-center p-8 space-y-4"
              >
                <div className={cn("w-16 h-16 rounded-3xl nm-inset flex items-center justify-center bg-nm-bg group-hover:scale-110 transition-transform", widget.color)}>
                  <widget.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1e293b] font-cairo">{widget.title}</h3>
                  <span className="text-[10px] font-bold text-nm-accent-gold uppercase tracking-tighter">{widget.category}</span>
                </div>
                <p className="text-xs text-nm-text-muted leading-relaxed line-clamp-2">
                  {widget.desc}
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setSelectedWidget(null); setResult(null); setInputText(''); }}
                className="nm-button p-2 text-nm-text-muted"
              >
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </button>
              <h2 className="text-2xl font-bold font-cairo flex items-center gap-3">
                 {selectedWidget.title}
                 <span className="text-xs font-bold px-3 py-1 bg-nm-accent-gold/20 text-nm-accent-gold rounded-full">{selectedWidget.category}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
               {/* Input Section */}
               <div className="nm-card space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-[#1e293b]">أدخل البيانات أو النص القانوني:</p>
                     <div className="flex gap-2">
                        <button className="nm-button py-1.5 px-3 text-xs flex items-center gap-2">
                           <FileText className="w-3 h-3" />
                           إرفاق مستند
                        </button>
                     </div>
                  </div>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={selectedWidget.desc}
                    className="w-full nm-input min-h-[300px] text-sm leading-relaxed p-6"
                  />
                  <div className="flex gap-4">
                     <button 
                       onClick={handleAnalize}
                       disabled={!inputText.trim() || isLoading}
                       className={cn(
                         "flex-1 nm-button py-4 border-none font-bold text-lg flex items-center justify-center gap-3 transition-all",
                         !inputText.trim() || isLoading ? "opacity-50 grayscale" : "bg-nm-accent-gold text-[#1e293b]"
                       )}
                     >
                        {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Brain className="w-6 h-6" />}
                        {isLoading ? "جاري التحليل..." : "تشغيل براءة AI"}
                     </button>
                     <button 
                       onClick={() => setInputText('')}
                       className="nm-button px-6 text-nm-text-muted"
                     >تفريغ</button>
                  </div>
               </div>

               {/* Output Section */}
               <div className="nm-card h-full min-h-[460px] relative overflow-hidden bg-white/40">
                  <AnimatePresence mode="wait">
                    {!result && !isLoading ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center p-12 text-nm-text-muted space-y-6"
                      >
                         <div className="w-24 h-24 nm-inset rounded-full flex items-center justify-center">
                            <Brain className="w-10 h-10 opacity-30" />
                         </div>
                         <p className="font-tajawal text-sm max-w-xs">بانتظار المدخلات... اضغط على "تشغيل المحرك" لبدء التحليل القانوني الذكي</p>
                      </motion.div>
                    ) : isLoading ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center gap-8"
                      >
                         <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-nm-bg border-t-nm-accent-gold animate-spin" />
                            <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-nm-accent-gold animate-pulse" />
                         </div>
                         <div className="space-y-2">
                           <p className="font-cairo font-bold text-[#1e293b] text-xl">جاري التحليل القانوني...</p>
                           <p className="text-xs text-nm-text-muted">نظام براءة يراجع النصوص والقواعد القانونية المنطبقة</p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="h-full flex flex-col"
                      >
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold font-cairo text-nm-accent-gold">نتائج التحليل الذكي:</h3>
                            <div className="flex gap-2">
                               <button 
                                 onClick={() => { navigator.clipboard.writeText(result!); toast.success('تم النسخ'); }}
                                 className="nm-button p-2 text-nm-text-muted hover:text-nm-accent-gold"
                               >
                                  <Copy className="w-4 h-4" />
                               </button>
                               <button className="nm-button p-2 text-nm-text-muted hover:text-nm-accent-gold">
                                  <Download className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                         <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="prose prose-sm font-tajawal text-[#2d3748] whitespace-pre-wrap leading-relaxed">
                               {result}
                            </div>
                            <div className="mt-8 p-4 nm-inset bg-blue-50 rounded-2xl flex items-start gap-4">
                               <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                               <p className="text-[10px] text-blue-700 leading-normal italic">
                                  هذا التحليل تم بواسطة الذكاء الاصطناعي ويجب مراجعته من قبل محامٍ متخصص. نظام براءة لا يتحمل مسؤولية القرارات القانونية المتخذة بناءً على هذه النتائج.
                               </p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
