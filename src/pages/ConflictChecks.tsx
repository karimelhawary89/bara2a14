import { useState } from 'react';
import { 
  ShieldCheck, Search, Users, Scale, 
  AlertCircle, CheckCircle2, ChevronLeft,
  Brain, FileSearch, History, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function ConflictChecks() {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [name, setName] = useState('');

  const runCheck = () => {
    if (!name.trim()) return;
    setIsChecking(true);
    setResult(null);
    
    toast.info('براءة AI تقوم بمسح قاعدة البيانات...');

    setTimeout(() => {
      setIsChecking(false);
      // Simulate conflict
      if (name.includes('أحمد')) {
        setResult({
          status: 'تنبيه',
          message: 'تم العثور على تضارب محتمل في المصالح.',
          matches: [
            { id: '1', reason: 'نفس الموكل في قضية "نزاع ملكية عقار المقطم"', status: 'نشطة' }
          ]
        });
      } else {
        setResult({
          status: 'آمن',
          message: 'لم يتم العثور على أي تضارب حالي في قاعدة البيانات.',
          matches: []
        });
      }
    }, 2000);
  };

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">فحص تضارب المصالح</h1>
          <p className="text-nm-text-muted mt-1">تأكد من سلامة موقفك المهني قبل قبول أي قضية</p>
        </div>
        <button className="nm-button bg-nm-bg flex items-center gap-2 text-nm-text-muted">
           <History className="w-5 h-5" />
           <span>سجل الفحوصات</span>
        </button>
      </div>

      <div className="nm-card space-y-8 p-10 max-w-4xl mx-auto">
         <div className="flex flex-col items-center text-center space-y-4 mb-4">
            <div className="w-20 h-20 nm-inset rounded-full flex items-center justify-center text-nm-accent-gold">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold font-cairo">تحقق سريع وشامل</h2>
            <p className="text-sm text-nm-text-muted max-w-md">أدخل اسم الخصم أو الموكل المحتمل أو أي طرف في القضية للبحث في كافة السجلات التاريخية والنشطة.</p>
         </div>

         <div className="space-y-6">
            <div className="relative">
               <Users className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-nm-text-muted" />
               <input 
                 type="text" 
                 placeholder="اسم الطرف (الخصم/الموكل/الممثل القانوني)..." 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full nm-input pr-16 py-6 text-lg font-cairo"
               />
            </div>

            <button 
              onClick={runCheck}
              disabled={isChecking || !name}
              className={cn(
                "w-full py-5 rounded-2xl text-xl font-bold font-cairo flex items-center justify-center gap-3 transition-all",
                isChecking ? "nm-inset bg-nm-bg text-nm-text-muted" : "nm-button bg-nm-accent-gold text-[#1e293b] hover:scale-[1.01] active:nm-pressed"
              )}
            >
               {isChecking ? (
                 <>
                    <div className="w-6 h-6 border-4 border-nm-accent-gold border-t-transparent rounded-full animate-spin" />
                    <span>جاري الفحص الذكي...</span>
                 </>
               ) : (
                 <>
                    <FileSearch className="w-6 h-6" />
                    <span>ابدأ الفحص الآن</span>
                 </>
               )}
            </button>
         </div>

         <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-8 rounded-3xl border-2 flex flex-col items-center text-center space-y-4",
                  result.status === 'تنبيه' ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
                )}
              >
                 <div className={cn("p-4 rounded-full nm-raised bg-white", result.status === 'تنبيه' ? 'text-red-500' : 'text-green-500')}>
                    {result.status === 'تنبيه' ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                 </div>
                 <h3 className={cn("text-2xl font-bold font-cairo", result.status === 'تنبيه' ? 'text-red-900' : 'text-green-900')}>
                    {result.status === 'تنبيه' ? 'احتمالية تضارب مصلحة' : 'آمن مهنياً'}
                 </h3>
                 <p className={cn("text-sm max-w-lg mb-6", result.status === 'تنبيه' ? 'text-red-700' : 'text-green-700')}>
                    {result.message}
                 </p>

                 {result.matches.length > 0 && (
                   <div className="w-full space-y-3">
                      {result.matches.map((m: any, i: number) => (
                        <div key={i} className="bg-white/80 p-4 rounded-2xl flex items-center justify-between border border-red-200">
                           <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-red-400" />
                              <span className="text-sm font-bold text-gray-800">{m.reason}</span>
                           </div>
                           <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold uppercase">{m.status}</span>
                        </div>
                      ))}
                   </div>
                 )}

                 <div className="flex gap-4 pt-6">
                    <button onClick={() => setResult(null)} className="nm-button bg-white text-nm-text-muted hover:text-nm-accent-gold">إلغاء</button>
                    {result.status === 'آمن' && (
                      <button className="nm-button bg-nm-accent-gold text-[#1e293b] font-bold px-10">تأكيد القبول والمتابعة</button>
                    )}
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="nm-card space-y-4">
            <h3 className="font-bold font-cairo flex items-center gap-2">
               <Scale className="w-5 h-5 text-nm-accent-gold" />
               لماذا الفحص مهم؟
            </h3>
            <p className="text-xs text-nm-text-muted leading-relaxed">
               تفرض نقابة المحامين المصرية والتقاليد المهنية عدم قبول توكيل من خصم لموكل حالي أو سابق في ذات الموضوع. براءة AI تساعدك في تجنب المساءلة التأديبية.
            </p>
         </div>
         <div className="nm-card space-y-4">
            <h3 className="font-bold font-cairo flex items-center gap-2">
               <Brain className="w-5 h-5 text-purple-500" />
               المدى البحثي
            </h3>
            <p className="text-xs text-nm-text-muted leading-relaxed">
               يبحث المساعد الذكي في: الأسماء الرباعية، أرقام السجلات التجارية، البطاقات الشخصية، وحتى ممثلي الشركات في كافة ملفاتك وأرشيفك القانوني الرقمي.
            </p>
         </div>
      </div>
    </div>
  );
}
