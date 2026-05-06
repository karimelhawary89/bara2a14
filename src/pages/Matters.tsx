import { useState } from 'react';
import { 
  Scale, Plus, Filter, Search, Grid, LayoutGrid, 
  Clock, Calendar, User, MoreVertical, ChevronLeft, 
  X, AlertCircle, FileText, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type Matter = {
  id: string;
  caseNumber: string;
  title: string;
  clientName: string;
  type: string;
  stage: string;
  status: string;
  priority: 'عاجلة' | 'عالية' | 'متوسطة' | 'منخفضة';
  lawyer: string;
  openDate: string;
  statuteCountdown?: number;
};

const STAGES = [
  "افتتاح", "إجراءات أولية", "قيد التقاضي", "مفاوضات", "تحكيم", "صدر حكم", "استئناف"
];

const MOCK_MATTERS: Matter[] = [
  { id: '1', caseNumber: 'QDY-001', title: 'نزاع ملكية عقار المعادي', clientName: 'شركة النيل للتطوير', type: 'عقاري', stage: 'قيد التقاضي', status: 'نشط', priority: 'عاجلة', lawyer: 'أ. محمد', openDate: '2024-01-10', statuteCountdown: 15 },
  { id: '2', caseNumber: 'QDY-002', title: 'دعوى تعويض عمالي', clientName: 'أحمد محمد علي', type: 'عمالي', stage: 'إجراءات أولية', status: 'نشط', priority: 'متوسطة', lawyer: 'أ. سارة', openDate: '2024-03-05' },
  { id: '3', caseNumber: 'QDY-003', title: 'خلاف عقد توريد سيارات', clientName: 'مؤسسة الإخلاص', type: 'تجاري', stage: 'مفاوضات', status: 'معلق', priority: 'عالية', lawyer: 'أ. أحمد', openDate: '2024-02-15', statuteCountdown: 45 },
];

export default function Matters() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [matters, setMatters] = useState<Matter[]>(MOCK_MATTERS);
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null);

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'عاجلة': return 'bg-red-500';
      case 'عالية': return 'bg-orange-500';
      case 'متوسطة': return 'bg-amber-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-8 font-tajawal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">القضايا</h1>
          <p className="text-nm-text-muted mt-1">إدارة مسار التقاضي والملفات القانونية</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex nm-inset p-1 rounded-xl bg-white/50">
              <button 
                onClick={() => setViewMode('list')}
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", viewMode === 'list' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
              >قائمة</button>
              <button 
                onClick={() => setViewMode('kanban')}
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", viewMode === 'kanban' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
              >كانبان</button>
           </div>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>قضية جديدة</span>
           </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {matters.map((matter) => (
            <motion.div 
              key={matter.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="nm-card cursor-pointer group hover:scale-[1.02] transition-all border-r-4"
              style={{ borderRightColor: matter.priority === 'عاجلة' ? '#ef4444' : matter.priority === 'عالية' ? '#f97316' : '#f59e0b' }}
              onClick={() => setSelectedMatter(matter)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold font-cairo text-nm-accent-gold nm-inset px-2 py-1 rounded bg-white/50">
                  {matter.caseNumber}
                </span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  matter.status === 'نشط' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                )}>
                  {matter.status}
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#1e293b] mb-4 leading-tight min-h-[56px] line-clamp-2">
                {matter.title}
              </h3>

              <div className="space-y-3 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-nm-text-secondary">
                      <User className="w-4 h-4" />
                      <span>{matter.clientName}</span>
                   </div>
                   <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">{matter.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-nm-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>{matter.stage}</span>
                   </div>
                   <div className="flex items-center gap-2 text-nm-text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>{matter.openDate}</span>
                   </div>
                </div>
              </div>

              {matter.statuteCountdown && (
                <div className="mt-4 p-3 nm-inset bg-red-50 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-bold font-cairo">سقوط الحق بعد:</span>
                   </div>
                   <span className="text-sm font-bold text-red-600 font-cairo">{matter.statuteCountdown} يوم</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-8 min-h-[600px] snap-x scroll-smooth">
          {STAGES.map((stage) => {
            const stageMatters = matters.filter(m => m.stage === stage);
            return (
              <div key={stage} className="flex-shrink-0 w-80 snap-start">
                <div className="flex items-center justify-between mb-6 px-2">
                   <h3 className="font-cairo font-bold text-[#1e293b] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-nm-accent-gold" />
                      {stage}
                   </h3>
                   <span className="nm-inset px-2 py-0.5 rounded-lg text-xs font-bold text-nm-text-muted">{stageMatters.length}</span>
                </div>
                <div className="space-y-4">
                  {stageMatters.map(m => (
                    <div key={m.id} className="nm-card p-4 text-right cursor-grab active:cursor-grabbing hover:nm-pressed transition-all">
                       <p className="text-[10px] text-nm-accent-gold font-bold mb-2 uppercase">{m.caseNumber}</p>
                       <p className="text-sm font-bold text-[#1e293b] mb-3 line-clamp-2">{m.title}</p>
                       <div className="flex items-center justify-between mt-4">
                          <div className={cn("w-2 h-2 rounded-full", getPriorityColor(m.priority))} />
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                             {m.lawyer.split(' ').pop()?.[0]}
                          </div>
                       </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-nm-text-muted hover:bg-gray-100 flex items-center justify-center gap-2 text-sm">
                     <Plus className="w-4 h-4" />
                     إضافة هنا
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Matter Detail Panel Mock */}
      <AnimatePresence>
        {selectedMatter && (
          <div className="fixed inset-0 z-[2500] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMatter(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-3xl bg-nm-bg h-full shadow-2xl overflow-y-auto flex flex-col"
            >
               <div className="p-6 bg-[#1e293b] text-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button onClick={() => setSelectedMatter(null)} className="p-2 hover:bg-white/10 rounded-lg">
                        <X className="w-6 h-6" />
                     </button>
                     <div>
                        <h2 className="text-2xl font-bold font-cairo">{selectedMatter.caseNumber}</h2>
                        <p className="text-xs text-nm-accent-gold">{selectedMatter.title}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition-all font-cairo">تقرير شامل PDF</button>
                  </div>
               </div>

               <div className="p-8 space-y-8 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     {[
                       { label: "الحالة", value: selectedMatter.status, color: "text-green-500" },
                       { label: "الأولوية", value: selectedMatter.priority, color: "text-orange-500" },
                       { label: "النوع", value: selectedMatter.type, color: "text-blue-500" },
                       { label: "المسؤول", value: selectedMatter.lawyer, color: "text-purple-500" },
                     ].map((item, i) => (
                        <div key={i} className="nm-card p-4 text-center">
                           <p className="text-[10px] text-nm-text-muted mb-1 font-bold">{item.label}</p>
                           <p className={cn("font-bold text-sm", item.color)}>{item.value}</p>
                        </div>
                     ))}
                  </div>

                  <div className="nm-card space-y-6">
                     <div className="flex items-center justify-between border-b border-white/20 pb-4">
                        <h3 className="font-bold font-cairo text-lg">مسار القضية</h3>
                        <span className="text-xs text-nm-text-muted">آخر تحديث: منذ 5 أيام</span>
                     </div>
                     <div className="relative pt-4 overflow-hidden">
                        <div className="absolute top-8 right-0 left-0 h-1 bg-gray-200 rounded-full" />
                        <div className="absolute top-8 right-0 h-1 bg-nm-accent-gold rounded-full transition-all duration-1000" style={{ width: '45%' }} />
                        <div className="flex justify-between relative mt-2">
                           {STAGES.slice(0, 5).map((s, i) => (
                              <div key={i} className="flex flex-col items-center gap-4">
                                 <div className={cn(
                                   "w-4 h-4 rounded-full border-4 border-nm-bg z-10",
                                   i < 3 ? "bg-nm-accent-gold scale-125" : "bg-gray-300"
                                 )} />
                                 <span className={cn("text-[10px] font-bold transform -rotate-45 md:rotate-0", i < 3 ? "text-[#1e293b]" : "text-nm-text-muted")}>{s}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="nm-card bg-purple-600 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-x-4 -translate-y-4 blur-2xl" />
                        <h4 className="font-bold flex items-center gap-2 mb-4 relative z-10">
                           <TrendingUp className="w-5 h-5" />
                           توقع براءة AI للنتيجة
                        </h4>
                        <div className="text-center py-4 relative z-10">
                           <p className="text-5xl font-bold mb-2">78%</p>
                           <p className="text-xs opacity-80">احتمالية كسب القضية أو التسوية المرضية</p>
                        </div>
                        <button className="w-full mt-4 py-2 bg-white/20 rounded-xl text-xs font-bold hover:bg-white/30">تحليل العوامل المؤثرة</button>
                     </div>

                     <div className="nm-card space-y-4">
                        <h4 className="font-bold font-cairo border-b border-white/20 pb-4 flex items-center justify-between">
                           <span>الجلسة القادمة</span>
                           <Calendar className="w-4 h-4 text-nm-accent-gold" />
                        </h4>
                        <div className="text-center pt-2">
                           <p className="text-3xl font-bold text-[#1e293b]">15 مايو</p>
                           <p className="text-sm text-nm-text-muted mt-2">المحكمة الاقتصادية - قاعة 4</p>
                           <button className="mt-4 text-xs font-bold text-nm-accent-primary underline">إضافة ملاحظات التحضير</button>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
