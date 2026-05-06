import { useState } from 'react';
import { 
  CheckSquare, Plus, Filter, Search, Clock, 
  User, AlertCircle, Calendar, ArrowRight,
  MoreVertical, ChevronLeft, Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Task = {
  id: string;
  title: string;
  matterTitle: string;
  status: 'لم تبدأ' | 'جارية' | 'بانتظار العميل' | 'بانتظار الموافقة' | 'مكتملة';
  priority: 'عاجلة' | 'عالية' | 'متوسطة' | 'منخفضة';
  assignee: string;
  dueDate: string;
  isAiSuggested?: boolean;
};

const COLUMNS: Task['status'][] = [
  'لم تبدأ', 'جارية', 'بانتظار العميل', 'بانتظار الموافقة', 'مكتملة'
];

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'تحضير مذكرة الدفاع النهائية', matterTitle: 'نزاع عقار المعادي', status: 'جارية', priority: 'عاجلة', assignee: 'أ. محمد', dueDate: '2024-05-12' },
  { id: '2', title: 'مراجعة أوراق التوكيل', matterTitle: 'دعوى تعويض عمالي', status: 'لم تبدأ', priority: 'متوسطة', assignee: 'أ. سارة', dueDate: '2024-05-15', isAiSuggested: true },
  { id: '3', title: 'طلب إفادة من الشهر العقاري', matterTitle: 'نزاع عقار المعادي', status: 'بانتظار العميل', priority: 'عالية', assignee: 'أ. محمد', dueDate: '2024-05-10' },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'عاجلة': return 'bg-red-500';
      case 'عالية': return 'bg-orange-500';
      case 'متوسطة': return 'bg-amber-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-8 font-tajawal h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">المهام</h1>
          <p className="text-nm-text-muted mt-1">إدارة وتنظيم الأعمال القانونية اليومية</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>مهمة جديدة</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-6">
         {/* Filter Bar */}
         <div className="nm-card flex gap-6 py-3 px-6 items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-nm-text-muted">
               <Filter className="w-4 h-4" />
               <span>تصفية:</span>
            </div>
            <div className="flex gap-4">
               {['الكل', 'مهامي', 'عاجل'].map(f => (
                 <button key={f} className={cn("px-4 py-1.5 rounded-xl text-xs font-bold transition-all", f === 'الكل' ? "nm-inset text-nm-accent-gold" : "hover:nm-inset text-nm-text-muted")}>
                    {f}
                 </button>
               ))}
            </div>
         </div>

         {/* Kanban Board */}
         <div className="flex-1 overflow-x-auto flex gap-6 pb-6 custom-scrollbar snap-x">
            {COLUMNS.map((col) => {
              const colTasks = tasks.filter(t => t.status === col);
              return (
                <div key={col} className="w-80 shrink-0 flex flex-col gap-4 snap-start">
                   <div className="flex items-center justify-between px-3">
                      <h3 className="font-cairo font-bold text-sm text-[#1e293b] flex items-center gap-2">
                         <span className={cn("w-1.5 h-1.5 rounded-full", col === 'مكتملة' ? 'bg-green-500' : 'bg-nm-accent-gold')} />
                         {col}
                      </h3>
                      <span className="font-bold text-[10px] nm-inset px-2 py-0.5 rounded-full text-nm-text-muted">{colTasks.length}</span>
                   </div>

                   <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                      {colTasks.map(task => (
                        <div key={task.id} className="nm-card p-4 group cursor-grab active:cursor-grabbing hover:nm-pressed transition-all">
                           <div className="flex items-start justify-between mb-3">
                              <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-bold font-cairo text-white", getPriorityColor(task.priority))}>
                                 {task.priority}
                              </span>
                              {task.isAiSuggested && (
                                <div className="p-1 px-1.5 bg-purple-100 rounded-lg" title="مقترح بالذكاء الاصطناعي">
                                   <Brain className="w-3 h-3 text-purple-600" />
                                </div>
                              )}
                           </div>
                           
                           <h4 className="text-sm font-bold text-[#1e293b] leading-relaxed mb-4">{task.title}</h4>
                           
                           <div className="flex items-center gap-2 text-[10px] text-nm-accent-primary font-bold mb-4">
                              <ArrowRight className="w-3 h-3 rotate-180" />
                              <span className="truncate">{task.matterTitle}</span>
                           </div>

                           <div className="flex items-center justify-between pt-3 border-t border-white/20">
                              <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 rounded-lg nm-inset flex items-center justify-center bg-nm-bg">
                                    <User className="w-3 h-3 text-nm-text-muted" />
                                 </div>
                                 <span className="text-[10px] font-semibold text-nm-text-secondary">{task.assignee}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500">
                                 <Calendar className="w-3 h-3" />
                                 <span>{task.dueDate}</span>
                              </div>
                           </div>
                        </div>
                      ))}
                      
                      <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-nm-text-muted hover:nm-inset transition-all flex items-center justify-center gap-2 text-xs font-bold font-cairo">
                         <Plus className="w-4 h-4" />
                         إضافة مهمة
                      </button>
                   </div>
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
}
