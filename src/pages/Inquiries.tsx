import { useState } from 'react';
import { 
  Inbox, Search, Filter, Plus, Phone, 
  Mail, MessageSquare, Clock, UserCheck,
  X, CheckCircle2, AlertCircle, Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  source: string;
  topic: string;
  status: 'جديد' | 'قيد المعالجة' | 'تم القبول' | 'مرفوض';
  date: string;
};

const MOCK_INQUIRIES: Inquiry[] = [
  { id: '1', name: 'ياسر القحطاني', phone: '01011223344', source: 'الموقع الإلكتروني', topic: 'استشارة في تأسيس شركة', status: 'جديد', date: 'منذ ساعة' },
  { id: '2', name: 'منى ذكي', phone: '01223344556', source: 'واتساب', topic: 'خلاف إيجاري', status: 'قيد المعالجة', date: 'منذ 3 ساعات' },
  { id: '3', name: 'كامل الوزير', phone: '01122334455', source: 'هاتف', topic: 'دعوى تعويض مدني', status: 'جديد', date: 'أمس' },
];

export default function Inquiries() {
  const [inquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">الاستفسارات</h1>
          <p className="text-nm-text-muted mt-1">إدارة الوارد من الموكلين المحتملين</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
           <Plus className="w-5 h-5" />
           <span>إضافة استفسار</span>
        </button>
      </div>

       {/* Summary Row */}
       <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['جديد (2)', 'قيد المعالجة (1)', 'تم الرد (8)', 'مرفوض (1)'].map((s, i) => (
            <button key={i} className={cn(
              "px-6 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all",
              i === 0 ? "bg-nm-accent-gold text-[#1e293b] nm-raised" : "nm-inset text-nm-text-muted"
            )}>
               {s}
            </button>
          ))}
       </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inq) => (
          <div key={inq.id} className="nm-card group hover:nm-pressed transition-all">
             <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg shrink-0">
                   {inq.source === 'واتساب' ? <MessageSquare className="w-8 h-8 text-green-500" /> : 
                    inq.source === 'هاتف' ? <Phone className="w-8 h-8 text-blue-500" /> : 
                    <Inbox className="w-8 h-8 text-nm-accent-gold" />}
                </div>

                <div className="flex-1 space-y-2 text-center md:text-right">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                      <h3 className="text-xl font-bold text-[#1e293b]">{inq.name}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                        inq.status === 'جديد' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      )}>{inq.status}</span>
                   </div>
                   <p className="text-sm font-semibold text-nm-text-secondary">{inq.topic}</p>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-bold text-nm-text-muted mt-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inq.date}</span>
                      <span className="flex items-center gap-1 uppercase"><Share2 className="w-3 h-3" /> {inq.source}</span>
                      <span className="flex items-center gap-1" dir="ltr"><Phone className="w-3 h-3" /> {inq.phone}</span>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => toast.success('تم تحويل الاستفسار إلى قضية')}
                     className="nm-button text-nm-accent-success py-2 px-6 flex items-center gap-2"
                   >
                      <UserCheck className="w-4 h-4" />
                      قبول وتحويل
                   </button>
                   <button className="nm-button text-nm-accent-danger p-2">
                      <X className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
