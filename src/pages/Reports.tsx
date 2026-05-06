import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Scale, FileText, Download, 
  Filter, Calendar, ExternalLink, Brain, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DATA_MONTHLY = [
  { name: 'يناير', revenue: 45000, cases: 12 },
  { name: 'فبراير', revenue: 52000, cases: 15 },
  { name: 'مارس', revenue: 38000, cases: 10 },
  { name: 'أبريل', revenue: 61000, cases: 18 },
  { name: 'مايو', revenue: 55000, cases: 14 },
];

const DATA_TYPES = [
  { name: 'مدني', value: 400, color: '#4a90d9' },
  { name: 'تجاري', value: 300, color: '#f59e0b' },
  { name: 'جنائي', value: 200, color: '#e74c3c' },
  { name: 'عمالي', value: 150, color: '#27ae60' },
];

export default function Reports() {
  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">التقارير والتحليلات</h1>
          <p className="text-nm-text-muted mt-1">نظرة شاملة على أداء المكتب ونمو الأعمال</p>
        </div>
        <div className="flex gap-4">
           <button className="nm-button flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>آخر 6 أشهر</span>
           </button>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>تحميل التقرير السنوي</span>
           </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'نسبة الفوز', value: '78%', icon: TrendingUp, color: 'text-green-500' },
          { label: 'موكلون جدد', value: '14', icon: Users, color: 'text-blue-500' },
          { label: 'قضايا منتهية', value: '28', icon: Scale, color: 'text-purple-500' },
          { label: 'عقود تم صياغتها', value: '112', icon: FileText, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="nm-card p-6 flex flex-col items-center text-center space-y-3">
             <div className={cn("w-12 h-12 rounded-2xl nm-inset flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
             </div>
             <p className="text-3xl font-bold text-[#1e293b]">{stat.value}</p>
             <p className="text-xs font-bold text-nm-text-muted uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Monthly Revenue Chart */}
         <div className="nm-card space-y-6">
            <h3 className="font-bold font-cairo text-[#1e293b] flex items-center justify-between">
               <span>نمو الإيرادات الشهرية</span>
               <TrendingUp className="w-4 h-4 text-green-500" />
            </h3>
            <div className="h-80 w-full pt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA_MONTHLY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#4a90d9" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#4a90d9" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" tick={{fontSize: 10}} stroke="#a0aec0" />
                     <YAxis tick={{fontSize: 10}} stroke="#a0aec0" axisLine={false} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#4a90d9" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Case Distribution */}
         <div className="nm-card space-y-6">
            <h3 className="font-bold font-cairo text-[#1e293b]">توزيع القضايا حسب النوع</h3>
            <div className="h-80 w-full flex flex-col md:flex-row items-center justify-around">
               <div className="flex-1 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={DATA_TYPES}
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {DATA_TYPES.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="space-y-4 px-4 w-full md:w-auto">
                  {DATA_TYPES.map((type, i) => (
                    <div key={i} className="flex items-center justify-between md:justify-start gap-4">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                       <span className="text-sm font-semibold text-nm-text-muted">{type.name}</span>
                       <span className="text-sm font-bold text-[#1e293b] mr-auto md:mr-8">{((type.value / 1050) * 100).toFixed(0)}%</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* AI Usage Metering Section */}
      <div className="nm-card space-y-6">
         <h3 className="font-bold font-cairo text-[#1e293b] flex items-center gap-2">
            <Zap className="w-5 h-5 text-nm-accent-gold" />
            استهلاك موارد الذكاء الاصطناعي (Usage Metering)
         </h3>
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead>
                  <tr className="border-b border-white/20">
                     <th className="py-4 px-2 text-xs font-bold text-nm-text-muted uppercase">المستخدم</th>
                     <th className="py-4 px-2 text-xs font-bold text-nm-text-muted uppercase">عدد العمليات</th>
                     <th className="py-4 px-2 text-xs font-bold text-nm-text-muted uppercase">التكلفة التقديرية</th>
                     <th className="py-4 px-2 text-xs font-bold text-nm-text-muted uppercase">الخطة</th>
                  </tr>
               </thead>
               <tbody className="text-sm font-semibold">
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td className="py-4 px-2">أ. محمد الهواري</td>
                     <td className="py-4 px-2">1,245</td>
                     <td className="py-4 px-2 text-nm-accent-primary">12.50 $</td>
                     <td className="py-4 px-2"><span className="px-2 py-0.5 bg-gold-100 text-nm-accent-gold rounded text-[10px]">PRO</span></td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td className="py-4 px-2">أ. سارة محمود</td>
                     <td className="py-4 px-2">850</td>
                     <td className="py-4 px-2 text-nm-accent-primary">8.20 $</td>
                     <td className="py-4 px-2"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">BASIC</span></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* AI Insights Bar */}
      <div className="nm-card bg-[#1e293b] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-nm-accent-gold opacity-10 blur-3xl -translate-x-10 -translate-y-20" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 nm-raised border border-white/5 flex items-center justify-center shrink-0">
               <Brain className="w-8 h-8 text-nm-accent-gold" />
            </div>
            <div className="flex-1 space-y-2">
               <h4 className="text-xl font-bold font-cairo text-nm-accent-gold">تحليل براءة AI للأداء الذكي</h4>
               <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                  هناك زيادة ملحوظة بنسبة 25% في القضايا العمالية هذا الربع. يُنصح بتخصيص محامٍ إضافي لهذا القسم لتحسين سرعة معالجة الملفات. كما تفوقت العقود المصاغة بـ AI في سرعة المراجعة من الطرف المقابل بنسبة 40%.
               </p>
            </div>
            <button className="nm-button bg-white text-[#1e293b] border-none font-bold py-3 px-8 whitespace-nowrap">عرض تفاصيل التحليل</button>
         </div>
      </div>
    </div>
  );
}
