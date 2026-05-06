import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Scale, CheckSquare, Calendar, FileText, 
  BookOpen, MessageCircle, ShieldCheck, Inbox, Receipt, 
  BarChart3, Brain, Bot, Settings, LogOut, ChevronLeft, ChevronDown,
  Globe, Clock, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: "الرئيسية", to: "/dashboard", icon: Home },
  { label: "العملاء", to: "/clients", icon: Users },
  { label: "القضايا", to: "/matters", icon: Scale },
  { label: "المهام", to: "/tasks", icon: CheckSquare },
  { label: "الجلسات", to: "/hearings", icon: Calendar },
  { label: "مصر الرقمية", to: "/digital-egypt", icon: Globe },
  { label: "الاستشارات", to: "/consultations", icon: Users },
  { label: "تضارب المصالح", to: "/conflict-checks", icon: ShieldCheck },
  { label: "تتبع الوقت", to: "/time-tracking", icon: Clock },
  { label: "المستندات", to: "/documents", icon: FileText },
  { label: "المكتبة القانونية", to: "/legal-library", icon: BookOpen },
  { label: "واتساب", to: "/whatsapp", icon: MessageCircle },
  { label: "الاستفسارات", to: "/inquiries", icon: Inbox },
  { label: "الفواتير", to: "/invoices", icon: Receipt },
  { label: "الاشتراك", to: "/billing", icon: CreditCard },
  { label: "التقارير", to: "/reports", icon: BarChart3 },
  { label: "الذكاء القانوني", to: "/ai-legal", icon: Brain, isAI: true },
  { label: "المساعد الذكي", to: "/assistant", icon: Bot, isAI: true },
  { label: "الإعدادات", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "sticky top-0 h-screen bg-[#1e293b] text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img 
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRncjF6aGR5c3lrY3poOWl5Y2ZhOTNuazhtdnBxaWcyYXo1MmtrcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7ZZQu6H09rNVniLpQK/giphy.gif" 
              className="w-10 h-10 rounded-lg"
              alt="براءة"
            />
            <span className="font-cairo font-bold text-xl tracking-tight">براءة</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-nm-accent-gold/20 text-nm-accent-gold font-bold border-r-4 border-nm-accent-gold" 
                  : "hover:bg-white/5 text-gray-400"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", item.isAI && "text-purple-400")} />
              {!collapsed && (
                <span className="font-cairo text-sm whitespace-nowrap">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute right-full mr-2 px-2 py-1 bg-[#1e293b] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-cairo">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        {!collapsed && (
          <div className="px-4 py-3 bg-white/5 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-nm-accent-gold flex items-center justify-center font-bold text-[#1e293b]">
              م
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">المستخدم</p>
              <p className="text-xs text-gray-500 truncate">خطة مجانية</p>
            </div>
          </div>
        )}
        <button className={cn(
          "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-nm-accent-danger hover:bg-nm-accent-danger/10 transition-colors",
          collapsed && "justify-center"
        )}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-cairo text-sm">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
}
