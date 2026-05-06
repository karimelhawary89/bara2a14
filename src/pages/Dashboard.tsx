import { 
  Users, Scale, Calendar, TrendingUp, RefreshCw, Brain, 
  Receipt, BarChart3, Clock, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-8 font-tajawal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">لوحة التحكم</h1>
          <p className="text-nm-text-muted mt-1">صباح الخير، أ. محمد | {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-purple-500/10 text-purple-600 px-4 py-2 rounded-xl border border-purple-200">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-bold font-cairo">براءة AI جاهز</span>
           </div>
           <button className="nm-button p-2 text-nm-text-muted">
              <RefreshCw className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "إجمالي العملاء", value: "124", icon: Users, color: "text-blue-500", trend: "+12%" },
          { label: "القضايا النشطة", value: "42", icon: Scale, color: "text-green-500", trend: "+5%" },
          { label: "الجلسات هذا الأسبوع", value: "7", icon: Calendar, color: "text-purple-500", trend: "" },
          { label: "الإيرادات المستحقة", value: "45,500", icon: TrendingUp, color: "text-nm-accent-gold", trend: "EGP" },
        ].map((stat, i) => (
          <div key={i} className="nm-card flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
            <div>
              <p className="text-sm text-nm-text-muted font-cairo mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-[#1e293b]">{stat.value}</h3>
              {stat.trend && (
                <p className={cn("text-xs mt-2 font-bold", stat.trend.includes('+') ? "text-green-600" : "text-nm-text-muted")}>
                   {stat.trend}
                </p>
              )}
            </div>
            <div className={cn("w-12 h-12 rounded-2xl nm-inset flex items-center justify-center", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="nm-card h-full">
            <h3 className="text-xl font-bold font-cairo mb-6 flex items-center gap-2">
               <Clock className="w-5 h-5 text-nm-accent-gold" />
               آخر النشاطات
            </h3>
            <div className="space-y-6">
              {[
                { icon: Users, text: "تم إضافة عميل جديد: شركة الأفق العقارية", time: "منذ 10 دقائق", color: "bg-blue-100 text-blue-600" },
                { icon: FileText, text: "تم رفع عقد جديد للمراجعة — قضية التحكيم", time: "منذ 25 دقيقة", color: "bg-orange-100 text-orange-600" },
                { icon: Receipt, text: "إصدار فاتورة أتعاب برقم INV-2024-089", time: "منذ ساعتين", color: "bg-green-100 text-green-600" },
                { icon: Calendar, text: "تذكير: جلسة محكمة الأسرة — غداً 10:00 ص", time: "منذ 5 ساعات", color: "bg-purple-100 text-purple-600" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:nm-pressed transition-all group cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", activity.color)}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1e293b]">{activity.text}</p>
                    <p className="text-xs text-nm-text-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="space-y-8">
          {/* Quick AI Action */}
          <div className="nm-card bg-[#1e293b] text-white overflow-hidden relative group cursor-pointer">
             <div className="absolute top-0 right-0 w-32 h-32 bg-nm-accent-gold opacity-10 blur-3xl -translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity" />
             <h3 className="text-lg font-bold font-cairo mb-4 flex items-center gap-2 relative z-10 text-nm-accent-gold">
                <Brain className="w-5 h-5" />
                اسأل براءة AI
             </h3>
             <textarea 
               placeholder="اكتب سؤالك القانوني السريع هنا..." 
               className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-nm-accent-gold min-h-[100px] font-tajawal relative z-10"
             />
             <button className="w-full mt-4 nm-button bg-nm-accent-gold text-[#1e293b] border-none font-bold py-2 relative z-10">إرسال</button>
          </div>

          {/* Upcoming Hearings */}
          <div className="nm-card">
              <h3 className="text-lg font-bold font-cairo mb-6 flex items-center justify-between">
                 <span>الجلسات القادمة</span>
                 <Calendar className="w-5 h-5 text-purple-500" />
              </h3>
              <div className="space-y-4">
                 {[
                   { title: "قضية العقارات", court: "الجيزة الابتدائية", date: "15 مايو", priority: "عاجلة" },
                   { title: "نزاع عمالي", court: "عمالي القاهرة", date: "18 مايو", priority: "عادية" },
                 ].map((h, i) => (
                    <div key={i} className="p-4 bg-nm-bg nm-inset rounded-xl flex items-start gap-4">
                       <div className={cn("w-1 h-12 rounded-full", h.priority === "عاجلة" ? "bg-red-500" : "bg-blue-500")} />
                       <div>
                          <p className="text-sm font-bold text-[#1e293b]">{h.title}</p>
                          <p className="text-xs text-nm-text-muted mt-1">{h.court}</p>
                          <p className="text-xs font-bold text-nm-accent-gold mt-2">{h.date}</p>
                       </div>
                    </div>
                 ))}
                 <button className="w-full text-xs font-bold text-nm-accent-primary mt-4 hover:underline">عرض التقويم الكامل ←</button>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}
