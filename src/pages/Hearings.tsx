import { useState } from 'react';
import { 
  Calendar as CalendarIcon, List, Plus, Search, 
  ChevronLeft, ChevronRight, Clock, MapPin, 
  MoreVertical, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Hearing = {
  id: string;
  title: string;
  matterTitle: string;
  court: string;
  date: string;
  time: string;
  status: 'قادم' | 'مكتمل' | 'ملغى' | 'مؤجل';
  priority: 'عاجلة' | 'مهمة' | 'عادية';
};

const MOCK_HEARINGS: Hearing[] = [
  { id: '1', title: 'جلسة المرافعة العقارية', matterTitle: 'قضية نزاع مدني المعادي', court: 'محكمة الجيزة الابتدائية - قاعة 4', date: '2024-05-15', time: '10:00 ص', status: 'قادم', priority: 'عاجلة' },
  { id: '2', title: 'جلسة استماع شهود', matterTitle: 'دعوى تعويض عمالي', court: 'محكمة العمال - قاعة 12', date: '2024-05-18', time: '11:30 ص', status: 'قادم', priority: 'مهمة' },
  { id: '3', title: 'جلسة الصلح', matterTitle: 'خلاف عقد سيارات', court: 'الغرفة التجارية', date: '2024-05-10', time: '09:00 ص', status: 'مؤجل', priority: 'عادية' },
];

export default function Hearings() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">المواعيد والجلسات</h1>
          <p className="text-nm-text-muted mt-1">تتبع جلسات المحاكم والمواعيد القانونية</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex nm-inset p-1 rounded-xl bg-white/50">
              <button 
                onClick={() => setView('list')}
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", view === 'list' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
              >قائمة</button>
              <button 
                onClick={() => setView('calendar')}
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", view === 'calendar' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
              >التقويم</button>
           </div>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>جلسة جديدة</span>
           </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-cairo text-nm-accent-gold">هذا الأسبوع ( {MOCK_HEARINGS.length} )</h2>
              <div className="flex gap-4">
                 <button className="nm-button p-2 text-nm-text-muted transition-all active:nm-pressed">
                    <ChevronRight className="w-5 h-5" />
                 </button>
                 <button className="nm-button p-2 text-nm-text-muted transition-all active:nm-pressed">
                    <ChevronLeft className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {MOCK_HEARINGS.map((h) => (
                <div key={h.id} className="nm-card group hover:scale-[1.01] transition-all flex flex-col md:flex-row items-center gap-8">
                   <div className="w-full md:w-32 flex flex-col items-center justify-center p-4 nm-inset rounded-2xl bg-white/40">
                      <p className="text-[10px] font-bold text-nm-text-muted uppercase mb-1">مايو</p>
                      <p className="text-4xl font-bold text-nm-accent-gold">{h.date.split('-')[2]}</p>
                      <p className="text-xs font-bold text-[#1e293b] mt-1">الإثنين</p>
                   </div>

                   <div className="flex-1 text-center md:text-right space-y-2">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                         <span className={cn(
                           "px-2 py-0.5 rounded text-[8px] font-bold font-cairo uppercase",
                           h.priority === 'عاجلة' ? "bg-red-100 text-red-600" :
                           h.priority === 'مهمة' ? "bg-orange-100 text-orange-600" :
                           "bg-blue-100 text-blue-600"
                         )}>
                            {h.priority}
                         </span>
                         <h3 className="text-xl font-bold text-[#1e293b]">{h.title}</h3>
                      </div>
                      <p className="text-sm font-semibold text-nm-accent-primary">{h.matterTitle}</p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-nm-text-muted">
                         <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-4 h-4 text-nm-accent-gold" />
                            <span>{h.time}</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs">
                            <MapPin className="w-4 h-4 text-nm-accent-gold" />
                            <span>{h.court}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <button className="nm-button text-nm-accent-primary py-2 px-6">تحضير الجلسة</button>
                      <button className="nm-button p-2 text-nm-text-muted">
                         <MoreVertical className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        <div className="nm-card min-h-[600px] flex items-center justify-center p-20 text-center">
           <div className="space-y-6 max-w-sm mx-auto">
              <div className="w-24 h-24 nm-inset rounded-full flex items-center justify-center mx-auto text-nm-text-muted">
                 <CalendarIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-cairo text-[#1e293b]">عرض التقويم القانوني</h3>
              <p className="text-sm text-nm-text-muted leading-relaxed">جاري ربط نظام براءة مع Google Calendar. يمكنك حالياً عرض الجلسات في وضع القائمة.</p>
              <button onClick={() => setView('list')} className="nm-button text-nm-accent-gold font-bold">العودة إلى وضع القائمة</button>
           </div>
        </div>
      )}
    </div>
  );
}
