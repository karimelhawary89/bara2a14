import { useState } from 'react';
import { 
  Clock, Play, Pause, Square, Plus, 
  Search, Filter, ChevronRight, Calendar,
  User, Briefcase, FileText, Download,
  CheckCircle2, Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type TimeEntry = {
  id: string;
  lawyer: string;
  matter: string;
  description: string;
  duration: string;
  date: string;
  isBilled: boolean;
};

const MOCK_ENTRIES: TimeEntry[] = [
  { id: '1', lawyer: 'أ. محمد الهواري', matter: 'نزاع عقار المعادي', description: 'مراجعة أوراق الملكية في مكتب الشهر العقاري.', duration: '2:30 ساعة', date: '2024-05-04', isBilled: true },
  { id: '2', lawyer: 'أ. سارة محمود', matter: 'دعوى تعويض عمالي', description: 'صياغة مذكرة الدفاع الأولى.', duration: '1:15 ساعة', date: '2024-05-05', isBilled: false },
  { id: '3', lawyer: 'أ. محمد الهواري', matter: 'بدون قضية - عام', description: 'اجتماع مع الموكل الجديد ياسر القحطاني.', duration: '0:45 ساعة', date: '2024-05-05', isBilled: false },
];

export default function TimeEntries() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeEntry, setActiveEntry] = useState<{ matter: string, time: number } | null>(null);

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">تتبع الوقت</h1>
          <p className="text-nm-text-muted mt-1">تسجيل الساعات القانونية القابلة للفوترة</p>
        </div>
        <div className="flex gap-4">
           <button className="nm-button bg-white text-nm-accent-primary flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>تصدير ملف Excel</span>
           </button>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>إضافة يدوية</span>
           </button>
        </div>
      </div>

      {/* Active Timer Bar */}
      <div className={cn(
        "nm-card p-4 transition-all border-2",
        isRunning ? "border-nm-accent-gold bg-nm-accent-gold/5" : "border-transparent"
      )}>
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
               <div className={cn(
                 "w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse",
                 isRunning ? "bg-nm-accent-gold text-white" : "nm-inset bg-nm-bg text-nm-text-muted animate-none"
               )}>
                  <Clock className="w-8 h-8" />
               </div>
               <div className="space-y-1 text-center md:text-right">
                  <p className="text-xs font-bold text-nm-text-muted uppercase tracking-widest">{isRunning ? 'تتبع نشط الآن' : 'لا يوجد تتبع نشط'}</p>
                  <h3 className="text-xl font-bold text-[#1e293b] font-cairo">
                     {isRunning ? 'صياغة عريضة الدعوى...' : 'اختر قضية للبدء'}
                  </h3>
               </div>
               {isRunning && (
                 <div className="flex items-center gap-2 nm-inset px-6 py-2 rounded-2xl bg-white/50">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-2xl font-mono font-bold text-[#1e293b]">01:22:45</span>
                 </div>
               )}
            </div>

            <div className="flex gap-4">
               {!isRunning ? (
                 <button 
                   onClick={() => setIsRunning(true)}
                   className="nm-button bg-nm-accent-gold text-[#1e293b] py-3 px-10 flex items-center gap-2 font-bold"
                 >
                    <Play className="w-5 h-5 fill-current" />
                    ابدأ المؤقت
                 </button>
               ) : (
                 <>
                    <button className="nm-button p-3 text-orange-500">
                       <Pause className="w-6 h-6 fill-current" />
                    </button>
                    <button 
                      onClick={() => setIsRunning(false)}
                      className="nm-button bg-red-500 text-white border-none py-3 px-10 flex items-center gap-2 font-bold"
                    >
                       <Square className="w-5 h-5 fill-current" />
                       إيقاف وحفظ
                    </button>
                 </>
               )}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'ساعات الأسبوع', value: '38.5', icon: Clock, color: 'text-blue-500' },
           { label: 'قابلة للفوترة', value: '32.0', icon: CheckCircle2, color: 'text-green-500' },
           { label: 'غير مفلترة', value: '4.5', icon: FileText, color: 'text-orange-500' },
           { label: 'تقدير AI المستقبلي', value: '15.0', icon: Brain, color: 'text-purple-500' },
         ].map((s, i) => (
           <div key={i} className="nm-card p-6 flex flex-col items-center text-center gap-2">
              <div className={cn("w-10 h-10 rounded-xl nm-inset flex items-center justify-center mb-1", s.color)}>
                 <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-[#1e293b]">{s.value}</p>
              <p className="text-[10px] font-bold text-nm-text-muted uppercase tracking-tighter">{s.label}</p>
           </div>
         ))}
      </div>

      <div className="space-y-4">
         <h2 className="text-xl font-bold font-cairo text-[#1e293b] px-2">أحدث القيود</h2>
         <div className="grid grid-cols-1 gap-4">
            {MOCK_ENTRIES.map((entry) => (
              <div key={entry.id} className="nm-card group hover:scale-[1.01] transition-all flex flex-col md:flex-row items-center gap-8">
                 <div className="w-16 h-16 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg shrink-0">
                    <span className="text-lg font-bold text-[#1e293b]">{entry.lawyer[3]}</span>
                 </div>

                 <div className="flex-1 text-center md:text-right space-y-1">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                       <h3 className="font-bold text-[#1e293b]">{entry.matter}</h3>
                       {entry.isBilled && (
                         <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-bold uppercase">تمت الفوترة</span>
                       )}
                    </div>
                    <p className="text-sm text-nm-text-muted leading-relaxed">{entry.description}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-3 text-[10px] font-bold text-nm-text-muted">
                       <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-nm-accent-gold" />
                          {entry.lawyer}
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-nm-accent-gold" />
                          {entry.date}
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                    <p className="text-2xl font-bold text-nm-accent-gold">{entry.duration}</p>
                    {!entry.isBilled && (
                      <button className="text-[10px] font-bold text-blue-600 underline hover:text-blue-800 transition-colors">إضافة إلى فاتورة</button>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
