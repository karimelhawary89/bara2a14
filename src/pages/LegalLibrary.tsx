import { useState } from 'react';
import { 
  BookOpen, Search, Filter, Download, 
  Brain, CheckCircle2, ChevronLeft, ExternalLink,
  Gavel, FileText, Scale, Globe, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const CATEGORIES = ["الكل", "قوانين", "مراسيم", "أحكام نقض", "نماذج", "إجراءات"];

const MOCK_RESOURCES = [
  { id: '1', title: 'القانون المدني المصري رقم 131 لسنة 1948', category: 'قوانين', tags: ['مدني', 'أساسي'], date: '2024-01-01' },
  { id: '2', title: 'مبدأ نقض: المسئولية التقصيرية في حوادث السير', category: 'أحكام نقض', tags: ['تعويض', 'مسئولية'], date: '2024-02-15' },
  { id: '3', title: 'نموذج عقد عمل محدد المدة - قانون 12/2003', category: 'نماذج', tags: ['عمل', 'عقود'], date: '2024-03-10' },
];

export default function LegalLibrary() {
  const [activeCat, setActiveCat] = useState("الكل");

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">المكتبة القانونية</h1>
          <p className="text-nm-text-muted mt-1">المحرك البحثي للتشريعات والأحكام المصرية</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>إضافة مورد</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="nm-card space-y-6">
         <div className="relative">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-nm-text-muted" />
            <input 
              type="text" 
              placeholder="ابحث عن مادة قانونية، حكم نقض، أو نموذج..." 
              className="w-full nm-input pr-16 py-5 text-lg font-cairo"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
               <button className="nm-button bg-purple-600 text-white border-none py-2 px-6 text-sm font-bold flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  بحث ذكي
               </button>
            </div>
         </div>

         <div className="flex gap-3 overflow-x-auto pb-2 snap-x no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={cn(
                  "px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all snap-start",
                  activeCat === cat ? "bg-nm-accent-gold text-[#1e293b] nm-raised" : "text-nm-text-muted hover:text-[#1e293b] hover:nm-pressed"
                )}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Main Results */}
         <div className="space-y-6">
            <h3 className="font-bold font-cairo text-lg text-[#1e293b] px-2 uppercase tracking-wide">أحدث الموارد</h3>
            {MOCK_RESOURCES.map(res => (
              <div key={res.id} className="nm-card group hover:nm-pressed transition-all">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg shrink-0">
                       {res.category === 'قوانين' ? <Scale className="w-6 h-6 text-blue-500" /> : 
                        res.category === 'أحكام نقض' ? <Gavel className="w-6 h-6 text-purple-500" /> : 
                        <FileText className="w-6 h-6 text-orange-500" />}
                    </div>
                    <div className="flex-1 space-y-2">
                       <h4 className="font-bold text-[#1e293b] group-hover:text-nm-accent-gold transition-colors">{res.title}</h4>
                       <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 bg-nm-bg nm-inset rounded text-[10px] font-bold text-nm-text-muted uppercase">{res.category}</span>
                          {res.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">#{t}</span>
                          ))}
                       </div>
                    </div>
                    <button className="nm-button p-2 text-nm-text-muted">
                       <Download className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
         </div>

         {/* Side Suggestions */}
         <div className="space-y-6">
            <div className="nm-card bg-[#1e293b] text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-nm-accent-gold opacity-10 blur-3xl -translate-x-10 -translate-y-10" />
               <h3 className="font-bold font-cairo text-nm-accent-gold flex items-center gap-2 mb-4 relative z-10">
                  <Brain className="w-5 h-5" />
                  اقتراحات براءة AI
               </h3>
               <p className="text-sm text-gray-300 leading-relaxed mb-6 relative z-10">
                  بناءً على نشاطك الأخير في قضية "نزاع ملكية عقار المقطم"، قد يهمك مراجعة هذه المادة:
               </p>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                  <h4 className="font-bold text-white mb-2">المادة 968 من القانون المدني</h4>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed italic">
                     "من حاز منقولاً أو عقاراً دون أن يكون مالكاً له، أو حاز حقاً عينياً على منقول أو عقار دون أن يكون صاحباً له..."
                  </p>
                  <button className="mt-4 text-xs font-bold text-nm-accent-gold flex items-center gap-2 hover:underline">
                     قراءة المادة كاملة
                     <ExternalLink className="w-3 h-3" />
                  </button>
               </div>
            </div>

            <div className="nm-card">
               <h3 className="font-bold font-cairo mb-6">روابط سريعة</h3>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'مصر الرقمية', icon: Globe },
                    { label: 'بوابة النقض', icon: Scale },
                    { label: 'الجريدة الرسمية', icon: FileText },
                    { label: 'نقابة المحامين', icon: Gavel },
                  ].map((link, i) => (
                    <button key={i} className="flex flex-col items-center justify-center p-6 bg-nm-bg nm-inset rounded-2xl hover:nm-raised transition-all gap-3 overflow-hidden">
                       <link.icon className="w-6 h-6 text-nm-accent-gold" />
                       <span className="text-xs font-bold font-cairo">{link.label}</span>
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return <Plus {...props} />;
}
