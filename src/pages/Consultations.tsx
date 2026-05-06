import { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Calendar, 
  Clock, CheckCircle2, AlertCircle, Phone,
  MessageSquare, Brain, ArrowRight, MoreVertical 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type Consultation = {
  id: string;
  clientName: string;
  topic: string;
  date: string;
  time: string;
  status: 'مجدولة' | 'مكتملة' | 'ملغاة' | 'جارية';
  type: 'هاتف' | 'مكتب' | 'فيديو';
  isPaid: boolean;
};

const MOCK_CONSULTATIONS: Consultation[] = [
  { id: '1', clientName: 'محمد عادل', topic: 'استشارة تأسيس شركة ناشئة', date: '2024-05-10', time: '02:00 م', status: 'مجدولة', type: 'مكتب', isPaid: true },
  { id: '2', clientName: 'سارة محمود', topic: 'نزاع عمالي - فصل تعسفي', date: '2024-05-08', time: '11:00 ص', status: 'مكتملة', type: 'هاتف', isPaid: true },
  { id: '3', clientName: 'إبراهيم علي', topic: 'تقسيم ميراث عقاري', date: '2024-05-12', time: '04:30 م', status: 'جارية', type: 'فيديو', isPaid: false },
];

export default function Consultations() {
  const [filter, setFilter] = useState('الكل');

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">الاستشارات</h1>
          <p className="text-nm-text-muted mt-1">حجز المواعيد وإدارة الجلسات الاستشارية</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>حجز استشارة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'استشارات اليوم', value: '4', icon: Calendar, color: 'text-blue-500' },
           { label: 'بانتظار الدفع', value: '2', icon: AlertCircle, color: 'text-orange-500' },
           { label: 'مكتملة (شهر)', value: '48', icon: CheckCircle2, color: 'text-green-500' },
           { label: 'ساعات الاستشارة', value: '112', icon: Clock, color: 'text-purple-500' },
         ].map((s, i) => (
           <div key={i} className="nm-card p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl nm-inset flex items-center justify-center", s.color)}>
                 <s.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-nm-text-muted uppercase">{s.label}</p>
                 <p className="text-xl font-bold text-[#1e293b]">{s.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="nm-card flex flex-col md:flex-row gap-4 items-center">
         <div className="flex-1 relative w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nm-text-muted" />
            <input type="text" placeholder="بحث عن موكل أو موضوع استشارة..." className="w-full nm-input pr-12" />
         </div>
         <div className="flex gap-2">
            {['الكل', 'اليوم', 'مجدولة', 'جارية'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", filter === f ? "nm-inset text-nm-accent-gold" : "text-nm-text-muted hover:nm-pressed")}>
                {f}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {MOCK_CONSULTATIONS.map((c) => (
           <div key={c.id} className="nm-card group flex flex-col md:flex-row items-center gap-8 hover:nm-pressed transition-all">
              <div className="w-16 h-16 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg shrink-0">
                 {c.type === 'فيديو' ? <MessageSquare className="w-8 h-8 text-purple-500" /> : 
                  c.type === 'هاتف' ? <Phone className="w-8 h-8 text-green-500" /> : 
                  <Users className="w-8 h-8 text-nm-accent-gold" />}
              </div>

              <div className="flex-1 text-center md:text-right space-y-1">
                 <div className="flex items-center justify-center md:justify-start gap-3">
                    <h3 className="text-xl font-bold text-[#1e293b]">{c.clientName}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                      c.status === 'مجدولة' ? "bg-blue-100 text-blue-700" : 
                      c.status === 'جارية' ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    )}>{c.status}</span>
                 </div>
                 <p className="text-sm font-semibold text-nm-accent-primary">{c.topic}</p>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-[10px] font-bold text-nm-text-muted">
                    <span className="flex items-center gap-1.5 uppercase tracking-tighter">
                       <Calendar className="w-3.5 h-3.5" />
                       {c.date}
                    </span>
                    <span className="flex items-center gap-1.5 uppercase tracking-tighter">
                       <Clock className="w-3.5 h-3.5" />
                       {c.time}
                    </span>
                    <span className="flex items-center gap-1.5 uppercase tracking-tighter">
                       <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                       نوع الاستشارة: {c.type}
                    </span>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                 <div className={cn(
                   "px-4 py-1.5 rounded-xl text-[10px] font-bold nm-inset",
                   c.isPaid ? "text-green-600" : "text-red-500"
                 )}>
                    {c.isPaid ? 'تم تحصيل الأتعاب' : 'بانتظار الدفع'}
                 </div>
                 <div className="flex gap-2">
                    <button className="nm-button py-2 px-6 text-xs text-[#1e293b] font-bold flex items-center gap-2">
                       <Brain className="w-4 h-4 text-purple-600" />
                       تحليل AI
                    </button>
                    <button className="nm-button p-2 text-nm-text-muted">
                       <MoreVertical className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="nm-card bg-white border border-nm-accent-gold/20 flex flex-col items-center justify-center py-16 text-center space-y-6">
         <div className="w-20 h-20 nm-inset rounded-full flex items-center justify-center text-nm-accent-gold mb-2">
            <Brain className="w-10 h-10" />
         </div>
         <h2 className="text-3xl font-bold font-cairo">تحليل الجلسات بالذكاء الاصطناعي</h2>
         <p className="text-nm-text-muted max-w-xl leading-relaxed">
            يمكن لنظام براءة AI تسجيل وتحليل المشاورات الصوتية (بعد موافقة الموكل) لاستخراج النقاط القانونية الجوهرية وصياغة مسودة أولية لتقييم القضية تلقائياً.
         </p>
         <button className="nm-button bg-nm-accent-gold text-[#1e293b] px-10 py-4 font-bold text-lg rounded-2xl">تفعيل التسجيل الذكي</button>
      </div>
    </div>
  );
}
