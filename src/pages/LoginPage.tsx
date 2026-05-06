import { useNavigate } from 'react-router-dom';
import { 
  Scale, CheckCircle, Mail, Globe, Brain, Zap, Clock 
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row" dir="rtl">
      {/* Left Panel (Marketing) */}
      <div className="hidden md:flex md:w-5/12 bg-[#1e293b] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Animation Artifacts */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nm-accent-gold rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px] animate-pulse transition-all duration-3000" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-nm-accent-gold flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#1e293b]" />
            </div>
            <span className="text-2xl font-bold font-cairo">براءة</span>
          </div>

          <h2 className="text-4xl font-bold font-cairo mb-8 leading-tight">
            نظام إدارة المكاتب القانونية <span className="text-nm-accent-gold">بالذكاء الاصطناعي</span>
          </h2>

          <div className="space-y-6">
            {[
              { icon: Brain, text: "إدارة ذكية لكافة شؤون مكتبك" },
              { icon: Zap, text: "ذكاء قانوني متخصص في القانون المصري" },
              { icon: Clock, text: "توفير 70% من وقت صياغة العقود" },
              { icon: Globe, text: "تكامل مع كافة الخدمات الحكومية الرقمية" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <item.icon className="w-5 h-5 text-nm-accent-gold" />
                </div>
                <span className="font-tajawal text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-8">
           <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
              <div className="flex -space-x-4 space-x-reverse">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1e293b] bg-gray-600 flex items-center justify-center font-bold text-xs uppercase">
                       {i === 3 ? "300+" : "M"}
                    </div>
                 ))}
              </div>
              <p className="text-sm font-tajawal text-gray-400">
                 أكثر من <span className="text-white font-bold">300 مكتب محاماة</span> يعتمدون علينا يومياً.
              </p>
           </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex-1 bg-nm-bg flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2d3748 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="w-full max-w-md nm-card p-10 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-cairo text-[#1e293b] mb-3">مرحباً بك مجدداً 👋</h1>
            <p className="text-nm-text-secondary font-tajawal">سجّل دخولك للمتابعة وإدارة أعمالك</p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full nm-button bg-white text-[#1e293b] py-4 flex items-center justify-center gap-3 border border-gray-200"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />
              <span className="font-cairo font-bold">الدخول عبر Google</span>
            </button>

            <div className="flex items-center gap-4 text-nm-text-muted">
              <div className="flex-1 h-px bg-gray-300/30" />
              <span className="text-xs font-tajawal">أو عبر رابط سحري</span>
              <div className="flex-1 h-px bg-gray-300/30" />
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-cairo font-semibold text-[#1e293b] mb-2 mr-1">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    placeholder="name@office.com" 
                    className="w-full nm-input text-left" 
                    dir="ltr"
                  />
               </div>
               <button 
                 onClick={() => navigate('/dashboard')}
                 className="w-full nm-button bg-nm-accent-gold text-[#1e293b] py-4 hover:shadow-xl transition-all"
               >
                 إرسال رابط تسجيل الدخول
               </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-nm-text-muted font-tajawal leading-relaxed">
            بتسجيل الدخول، أنت توافق على <a href="#" className="underline hover:text-nm-accent-gold">شروط الاستخدام</a> و <a href="#" className="underline hover:text-nm-accent-gold">سياسة الخصوصية</a> الخاصة بنظام براءة.
          </p>

          <div className="mt-8 text-center">
             <button onClick={() => navigate('/')} className="text-sm font-cairo text-nm-accent-primary hover:underline">← العودة للرئيسية</button>
          </div>
        </div>
      </div>
    </div>
  );
}
