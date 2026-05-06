import { useState } from 'react';
import { 
  User, Shield, Bell, Brain, Zap, Globe, 
  Key, LogOut, ChevronLeft, Save, Plus, Trash2, Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TABS = [
  { id: 'profile', label: 'الملف الشخصي', icon: User },
  { id: 'ai', label: 'الذكاء الاصطناعي', icon: Brain },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'integrations', label: 'التكاملات', icon: Link2 },
  { id: 'security', label: 'الأمان', icon: Shield },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">الإعدادات</h1>
          <p className="text-nm-text-muted mt-1">إدارة الحساب، وتفضيلات المحرك الذكي</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
           <Save className="w-5 h-5" />
           <span>حفظ التغييرات</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl font-cairo text-sm font-bold transition-all text-right",
                activeTab === tab.id 
                  ? "bg-white nm-raised text-nm-accent-gold" 
                  : "text-nm-text-muted hover:text-[#1e293b]"
              )}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              <span>{tab.label}</span>
              <ChevronLeft className={cn("w-4 h-4 mr-auto transition-transform", activeTab === tab.id ? "opacity-100" : "opacity-0")} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="nm-card min-h-[500px]">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl nm-inset bg-nm-bg flex items-center justify-center relative">
                       <User className="w-12 h-12 text-gray-400" />
                       <button className="absolute -bottom-2 -right-2 p-2 bg-white nm-raised rounded-xl text-nm-accent-gold">
                          <Zap className="w-4 h-4" />
                       </button>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold font-cairo">أ. محمد الهواري</h3>
                       <p className="text-sm text-nm-text-muted">محامٍ نقض | شريك مؤسس</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-1">الاسم الكامل</label>
                       <input type="text" defaultValue="محمد الهواري" className="w-full nm-input" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-1">المسمى الوظيفي</label>
                       <input type="text" defaultValue="محامٍ جنائي" className="w-full nm-input" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-1">رقم الهاتف</label>
                       <input type="tel" defaultValue="01000867697" className="w-full nm-input text-left" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-1">البريد الإلكتروني</label>
                       <input type="email" defaultValue="m.hawary@office.com" className="w-full nm-input text-left" dir="ltr" />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'ai' && (
               <div className="space-y-8">
                  <div className="p-4 nm-inset bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
                     <Brain className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                     <div>
                        <h4 className="font-bold font-cairo text-purple-900">تفضيلات براءة AI</h4>
                        <p className="text-xs text-purple-700 leading-relaxed mt-1">
                           يمكنك تخصيص طريقة استجابة المساعد الذكي بما يتناسب مع أسلوب عملك القانوني.
                        </p>
                     </div>
                  </div>

                  <div className="space-y-6 pt-4">
                     <div className="flex items-center justify-between p-4 nm-raised rounded-2xl bg-white/50">
                        <div>
                           <p className="font-bold text-sm">نموذج الذكاء الاصطناعي</p>
                           <p className="text-[10px] text-nm-text-muted mt-0.5">اختر المحرك الذي تفضله (تتطلب بعض الموديلات اشتراك PRO)</p>
                        </div>
                        <select className="nm-input bg-transparent text-sm py-1.5 min-w-[150px]">
                           <option>Gemini 1.5 Pro</option>
                           <option>GPT-4o (PRO)</option>
                           <option>Claude 3 Opus (PRO)</option>
                        </select>
                     </div>

                     <div className="flex items-center justify-between p-4 nm-raised rounded-2xl bg-white/50">
                        <div>
                           <p className="font-bold text-sm">لهجة الاستجابة</p>
                           <p className="text-[10px] text-nm-text-muted mt-0.5">كيف تريد أن يتحدث معك المساعد؟</p>
                        </div>
                        <div className="flex nm-inset p-1 rounded-xl bg-nm-bg">
                           <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold bg-white nm-raised text-nm-accent-gold">فصحى قانونية</button>
                           <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold text-nm-text-muted">عامية مهذبة</button>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                         <label className="text-sm font-bold font-cairo mr-1">تعليمات مخصصة (System Prompt)</label>
                         <textarea 
                           placeholder="أضف تعليماتك الخاصة هنا (مثلاً: ركز دائماً على القانون الجنائي المصري...)" 
                           className="w-full nm-input min-h-[150px] text-sm"
                         />
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-8">
                 <h3 className="font-bold font-cairo text-lg">الربط مع الخدمات الخارجية</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'WhatsApp Business', status: 'متصل', icon: '💬', color: 'text-green-500' },
                      { name: 'Google Calendar', status: 'غير متصل', icon: '📅', color: 'text-blue-500' },
                      { name: 'Instapay E-bill', status: 'متصل', icon: '💸', color: 'text-purple-500' },
                      { name: 'مصر الرقمية (حكومي)', status: 'غير متصل', icon: '🏛️', color: 'text-gray-700' },
                    ].map((item, i) => (
                      <div key={i} className="p-6 nm-raised rounded-2xl flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <span className="text-3xl">{item.icon}</span>
                            <div>
                               <p className="font-bold text-sm tracking-tight">{item.name}</p>
                               <span className={cn("text-[10px] font-bold uppercase", item.status === 'متصل' ? 'text-green-500' : 'text-nm-text-muted')}>{item.status}</span>
                            </div>
                         </div>
                         <button className={cn(
                           "px-4 py-1.5 rounded-xl text-[10px] font-bold",
                           item.status === 'متصل' ? "nm-inset text-red-500" : "nm-button bg-nm-accent-gold text-white border-none"
                         )}>
                            {item.status === 'متصل' ? 'فصل' : 'توصيل'}
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
