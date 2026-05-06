import { useState } from 'react';
import { 
  Globe, Search, Zap, ExternalLink, Shield, 
  Clock, FileText, ChevronLeft, Plus, Filter,
  Building2, Gavel, Scale, Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type Service = {
  id: string;
  name: string;
  category: 'التوثيق' | 'المحاكم' | 'الشهر العقاري' | 'الأحوال الشخصية';
  description: string;
  price: string;
  time: string;
  isPopular?: boolean;
};

const SERVICES: Service[] = [
  { id: '1', name: 'استعلام عن قضية', category: 'المحاكم', description: 'معرفة الموقف القانوني وأحدث القرارات الصادرة في أي قضية مقيدة بالمحاكم المصرية.', price: 'مجاني', time: 'لحظي', isPopular: true },
  { id: '2', name: 'توكيل عام رسمي', category: 'التوثيق', description: 'عمل توكيل رسمي عام في القضايا أو التصرفات، يتطلب حضور الموكل في المكتب.', price: '150 ج.م', time: '1 يوم', isPopular: true },
  { id: '3', name: 'تحرير عقد بيع مسجل', category: 'الشهر العقاري', description: 'إجراءات التسجيل العقاري ونقل الملكية في مكاتب الشهر العقاري والتوثيق.', price: 'حسب القيمة', time: '15 يوم' },
  { id: '4', name: 'دعوى صحة توقيع', category: 'المحاكم', description: 'رفع دعوى صحة توقيع على العقود العرفية لإثبات صحة التوقيعات.', price: '1200 ج.م', time: '30-60 يوم' },
];

export default function DigitalEgypt() {
  const [activeCat, setActiveCat] = useState('الكل');
  const [search, setSearch] = useState('');

  const filtered = SERVICES.filter(s => 
    (activeCat === 'الكل' || s.category === activeCat) &&
    (s.name.includes(search) || s.description.includes(search))
  );

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">خدمات مصر الرقمية</h1>
           <p className="text-nm-text-muted mt-1">بوابة الربط مع الخدمات الحكومية والتقاضي الإلكتروني</p>
        </div>
        <div className="flex gap-4">
           <button className="nm-button bg-white text-nm-accent-primary flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>مزامنة البيانات</span>
           </button>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>طلب خدمة جديدة</span>
           </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="nm-card bg-nm-accent-primary text-white flex items-center gap-6 p-8">
            <Globe className="w-12 h-12 opacity-50" />
            <div>
               <p className="text-2xl font-bold font-cairo">12</p>
               <p className="text-xs font-bold uppercase tracking-widest text-blue-100">خدمة نشطة</p>
            </div>
         </div>
         <div className="nm-card flex items-center gap-6 p-8">
            <Building2 className="w-12 h-12 text-nm-accent-gold" />
            <div>
               <p className="text-2xl font-bold font-cairo">4</p>
               <p className="text-xs font-bold text-nm-text-muted uppercase">جهات حكومية متصلة</p>
            </div>
         </div>
         <div className="nm-card flex items-center gap-6 p-8">
            <Brain className="w-12 h-12 text-purple-500" />
            <div>
               <p className="text-2xl font-bold font-cairo">99%</p>
               <p className="text-xs font-bold text-nm-text-muted uppercase">دقة المزامنة التلقائية</p>
            </div>
         </div>
      </div>

      <div className="nm-card space-y-6">
         <div className="relative">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-nm-text-muted" />
            <input 
              type="text" 
              placeholder="ابحث عن خدمة حكومية أو إجراء قانوني..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full nm-input pr-16 py-5 text-lg font-cairo"
            />
         </div>

         <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {['الكل', 'التوثيق', 'المحاكم', 'الشهر العقاري', 'الأحوال الشخصية'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={cn(
                  "px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all",
                  activeCat === cat ? "bg-nm-accent-gold text-[#1e293b] nm-raised" : "text-nm-text-muted hover:text-[#1e293b]"
                )}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {filtered.map((s) => (
           <div key={s.id} className="nm-card group relative flex flex-col h-full hover:nm-pressed transition-all overflow-hidden">
              {s.isPopular && (
                <div className="absolute top-4 left-4">
                   <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">الأكثر طلباً</span>
                </div>
              )}

              <div className="p-4 space-y-4 flex-1">
                 <div className="w-12 h-12 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg">
                    {s.category === 'المحاكم' ? <Gavel className="w-6 h-6 text-blue-500" /> : 
                     s.category === 'الشهر العقاري' ? <Scale className="w-6 h-6 text-nm-accent-gold" /> : 
                     <FileText className="w-6 h-6 text-purple-500" />}
                 </div>

                 <div>
                    <h3 className="text-xl font-bold font-cairo text-[#1e293b]">{s.name}</h3>
                    <p className="text-[10px] text-nm-accent-primary font-bold uppercase tracking-wide mt-1">{s.category}</p>
                 </div>

                 <p className="text-sm text-nm-text-muted leading-relaxed line-clamp-2">
                    {s.description}
                 </p>

                 <div className="flex items-center gap-6 pt-4 text-xs font-bold text-nm-text-secondary">
                    <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4 text-nm-accent-gold" />
                       <span>{s.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-blue-400" />
                       <span>توقيت: {s.time}</span>
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-nm-bg/30 border-t border-white/10 flex gap-3">
                 <button className="flex-1 nm-button bg-white text-nm-accent-primary font-bold py-2.5">
                    بدء الإجراء الآن
                 </button>
                 <button className="nm-button p-2.5 text-nm-text-muted">
                    <ExternalLink className="w-5 h-5" />
                 </button>
              </div>
           </div>
         ))}
      </div>

      <div className="nm-card bg-[#1e293b] text-white p-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-nm-accent-gold opacity-10 blur-3xl -translate-x-20 -translate-y-20" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="shrink-0">
               <div className="w-24 h-24 rounded-full nm-inset flex items-center justify-center text-nm-accent-gold">
                  <Shield className="w-12 h-12" />
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <h2 className="text-3xl font-bold font-cairo">براءة AI للخدمات الحكومية</h2>
               <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  مساعدنا الذكي مدرب على كافة الإجراءات الحكومية في مصر. اسأله عن أي ورقة ناقصة أو خطوة تالية، وسيرشدك فوراً بناءً على اللوائح المحدثة 2024.
               </p>
               <button className="nm-button bg-nm-accent-gold text-[#1e293b] border-none font-bold py-4 px-10 rounded-2xl text-lg hover:scale-105 transition-transform">
                  استشارة المساعد الحكومي
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
