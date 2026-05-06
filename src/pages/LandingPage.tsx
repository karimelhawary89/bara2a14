import { useNavigate } from 'react-router-dom';
import { 
  Scale, Brain, FileText, CreditCard, Database, Users, 
  CheckCircle, ArrowLeft, Shield, Zap, Globe, Star
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nm-bg" dir="rtl">
      {/* Navigation */}
      <nav className="bg-[#1e293b] text-white px-6 py-4 sticky top-0 z-50 nm-raised shadow-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-nm-accent-gold flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#1e293b]" />
            </div>
            <span className="text-xl font-bold font-cairo">براءة</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-8 font-cairo text-sm">
                <a href="#features" className="hover:text-nm-accent-gold transition-colors">المميزات</a>
                <a href="#pricing" className="hover:text-nm-accent-gold transition-colors">الأسعار</a>
                <a href="#faq" className="hover:text-nm-accent-gold transition-colors">الأسئلة الشائعة</a>
             </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-cairo hover:text-nm-accent-gold transition-colors border border-white/20 rounded-lg"
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-nm-accent-gold text-[#1e293b] rounded-lg font-bold font-cairo hover:bg-[#d97706] transition-colors shadow-lg"
              >
                ابدأ مجانًا
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-nm-accent-gold/10 border border-nm-accent-gold/30 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-nm-accent-gold" />
            <span className="text-nm-accent-gold text-sm font-semibold font-cairo">
              عقل قانوني اصطناعي يدعم الناطقين بالعربية
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-[#1e293b] font-cairo mb-8 leading-tight">
            نظام براءة القانوني
          </h1>
          
          <p className="text-2xl text-nm-accent-gold font-bold font-cairo mb-6">
            الذكاء القانوني في خدمة مكتبك
          </p>
          
          <p className="text-nm-text-secondary text-lg mb-12 max-w-2xl mx-auto font-tajawal leading-relaxed">
            براءة هو مساعد قانوني ذكي مدعوم بالذكاء الاصطناعي يفهم العامية، يصيغ العقود والمذكرات، ويختصر وقتك من ساعات إلى دقائق.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/login')}
              className="nm-button bg-nm-accent-gold text-[#1e293b] text-lg px-10 py-4 flex items-center gap-3 group"
            >
              ابدأ مجانًا الآن
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            </button>
            <button 
              className="nm-button bg-white text-[#1e293b] text-lg px-10 py-4 border-2 border-[#1e293b]/5"
            >
              شاهد العرض التجريبي
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-10 mt-16 text-sm text-nm-text-muted font-cairo">
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <Shield className="w-4 h-4 text-nm-accent-success" />
              <span>آمن ومشفر</span>
            </div>
            <div className="flex items-center gap-2 hover:text-nm-accent-gold transition-colors">
              <Zap className="w-4 h-4 text-nm-accent-gold" />
              <span>سريع ومستجيب</span>
            </div>
            <div className="flex items-center gap-2 hover:text-nm-accent-primary transition-colors">
              <Globe className="w-4 h-4 text-nm-accent-primary" />
              <span>يعمل على جميع الأجهزة</span>
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c9a84c 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-white/30 backdrop-blur-sm relative border-y border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-[#1e293b] font-cairo mb-6">
              حوّل مكتبك القانوني إلى مكتب ذكي
            </h2>
            <p className="text-nm-text-secondary text-lg font-tajawal max-w-2xl mx-auto">
              تكامل فريد يجمع بين إدارة القضايا التقليدية والقدرات الهائلة للذكاء الاصطناعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'المساعد الذكي براءة',
                desc: 'يفهم العامية المصرية ويحوّلها لصياغة قانونية رسمية مع الاستشهاد بمواد القانون.',
                color: 'text-purple-500',
              },
              {
                icon: FileText,
                title: 'مولّد المستندات',
                desc: 'إنشاء عقود، إنذارات، مذكرات، وصحف دعاوى بصياغات قانونية محكمة في ثوانٍ.',
                color: 'text-nm-accent-primary',
              },
              {
                icon: Scale,
                title: 'إدارة القضايا',

                desc: 'تتبع كافة مراحل القضايا، الجلسات، والمواعيد النهائية في نظام واحد منظم.',
                color: 'text-nm-accent-gold',
              },
              {
                icon: Database,
                title: 'قاعدة المعرفة الرقمية',
                desc: 'دليل تفاعلي للخدمات الرقمية الحكومية (مصر الرقمية) وكيفية التعامل معها.',
                color: 'text-teal-500',
              },
              {
                icon: CreditCard,

                title: 'الفوترة والمالية',
                desc: 'إدارة أتعاب الموكلين، إصدار الفواتير، وتتبع المدفوعات بدقة عالية.',
                color: 'text-nm-accent-warning',
              },
              {
                icon: Users,
                title: 'ملفات الموكلين',
                desc: 'ملف شامل لكل موكل يشمل تاريخ التواصل، القضايا، والمستندات المشتركة.',
                color: 'text-nm-accent-success',
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="nm-card hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-nm-bg nm-inset flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[#1e293b] font-cairo mb-4">
                  {feature.title}
                </h3>
                <p className="text-nm-text-secondary font-tajawal leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1e293b] font-cairo mb-6">خطط اشتراك مرنة</h2>
            <p className="text-nm-text-secondary font-tajawal">ابدأ مجانًا وترقَّ عندما يزداد حجم أعمالك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Free Plan */}
            <div className="nm-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/20 translate-x-16 -translate-y-16 rotate-45" />
              <h3 className="text-2xl font-bold text-[#1e293b] font-cairo mb-4">المجاني</h3>
              <p className="text-nm-text-muted font-tajawal mb-8 italic">مثالي للمحامين المنفردين البادئين</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-[#1e293b] font-cairo">0</span>
                <span className="text-nm-text-muted font-cairo mr-2">جنيه/شهر</span>
              </div>
              <ul className="space-y-4 mb-10">
                {[
                  '15 استشارة في اليوم',
                  'إدارة حتى 10 قضايا',
                  'إدارة حتى 20 موكل',
                  'التقويم القانوني الأساسي',
                  'دعم فني عبر البريد',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-nm-text-secondary font-tajawal">
                    <CheckCircle className="w-5 h-5 text-nm-accent-success" />
                    {item}
                  </li>

                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="nm-button w-full py-4 text-[#1e293b] hover:nm-inset transition-all"
              >
                ابدأ رحلتك مجانًا
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="nm-card border-2 border-nm-accent-gold relative overflow-hidden">
               <div className="absolute top-0 left-0 bg-nm-accent-gold text-[#1e293b] py-1 px-10 -rotate-45 -translate-x-10 translate-y-2 font-bold text-xs font-cairo uppercase">الأكثر طلباً</div>
              <h3 className="text-2xl font-bold text-[#1e293b] font-cairo mb-4">الاحترافي</h3>
              <p className="text-nm-text-muted font-tajawal mb-8 italic">للمكاتب التي تسعى للتميز والسرعة</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-nm-accent-gold font-cairo">499</span>
                <span className="text-nm-text-muted font-cairo mr-2">جنيه/شهر</span>
              </div>
              <ul className="space-y-4 mb-10">
                {[
                  'استشارات لا محدودة بالذكاء الاصطناعي',
                  'قضايا وعملاء بلا حدود',
                  'تحليل العقود المتقدم (GPT-4o)',
                  'قاعدة المعرفة الذكية والمزامنة',
                  'دعم ذو أولوية 24/7',
                  'تكاملات واتساب والخدمات الرقمية',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-nm-text-secondary font-tajawal">
                    <CheckCircle className="w-5 h-5 text-nm-accent-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="nm-button w-full py-4 bg-nm-accent-gold text-[#1e293b] hover:shadow-xl transition-all"
              >
                اشترك الآن في الخطة الاحترافية
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-nm-accent-gold flex items-center justify-center">
                  <Scale className="w-4 h-4 text-[#1e293b]" />
                </div>
                <span className="text-xl font-bold font-cairo">براءة</span>
              </div>
              <p className="text-gray-400 text-sm font-tajawal leading-relaxed mb-6">
                أول عقل قانوني اصطناعي في الشرق الأوسط مصمم لتمكين المحامين العرب والارتقاء بمهنة المحاماة.
              </p>
               <div className="flex gap-4">
                  {/* Social icons would go here */}
               </div>
            </div>
            <div>
              <h4 className="font-bold font-cairo mb-6 text-nm-accent-gold">روابط سريعة</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-tajawal">
                <li><a href="#" className="hover:text-white transition-colors">عن براءة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">مصر الرقمية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة القانونية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-cairo mb-6 text-nm-accent-gold">المميزات</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-tajawal">
                <li><a href="#" className="hover:text-white transition-colors">الذكاء الاصطناعي</a></li>
                <li><a href="#" className="hover:text-white transition-colors">إدارة المستندات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تحليل العقود</a></li>
                <li><a href="#" className="hover:text-white transition-colors">جدولة الجلسات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-cairo mb-6 text-nm-accent-gold">تواصل معنا</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-tajawal">
                <li className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-nm-accent-gold" />
                  <span>المعادي، القاهرة، مصر</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowLeft className="rotate-180 w-4 h-4 text-nm-accent-gold" />
                  <span dir="ltr">+20 100 086 7697</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-tajawal text-center">
            <p>© {new Date().getFullYear()} براءة Legal ERP. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
               <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
