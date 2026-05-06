import { useState } from 'react';
import { 
  CreditCard, Check, Zap, Shield, 
  Clock, Package, Star, ArrowRight,
  Brain, Building, User, Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const PLANS = [
  {
    id: 'free',
    name: 'البداية (باقة الفرد)',
    price: '0',
    description: 'للمحامين المستقلين الذين يبحثون عن تنظيم بسيط وذكي.',
    features: ['إدارة 10 قضايا', 'تحليل العقود بـ AI (3 شهرياً)', 'مزامنة WhatsApp المحدودة', 'أرشفة مستندات 1GB'],
    icon: User,
    color: 'gray'
  },
  {
    id: 'pro',
    name: 'المحترف (باقة النمو)',
    price: '499',
    description: 'للمحامين الطموحين الذين يحتاجون لقوة AI كاملة.',
    features: ['قضايا غير محدودة', 'تحليل عقود AI غير محدود', 'مساعد قانوني مدرب 24/7', 'فوترة تلقائية متقدمة', 'أرشفة 50GB'],
    icon: Zap,
    color: 'gold',
    isPopular: true
  },
  {
    id: 'firm',
    name: 'مكتب المحاماة (باقة المؤسسة)',
    price: '1499',
    description: 'للمكاتب والشركات القانونية التي تدير فرق عمل ضخمة.',
    features: ['كل ميزات المحترف', 'إدارة فريق (حتى 10 محامين)', 'تقارير أداء مؤسسية', 'ربط API كامل', 'دعم فني مخصص'],
    icon: Building2,
    color: 'primary'
  }
];

export default function SubscriptionBilling() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
         <h1 className="text-4xl font-bold font-cairo text-[#1e293b]">انطلق نحو التحول الرقمي الكامل</h1>
         <p className="text-nm-text-muted">اختر الخطة التي تناسب احتياجات مكتبك القانوني. يمكنك التغيير أو الإلغاء في أي وقت.</p>
         
         <div className="flex nm-inset p-1.5 rounded-2xl bg-white mt-6">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={cn("px-8 py-2.5 rounded-xl text-sm font-bold transition-all", billingCycle === 'monthly' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
            >شهرياً</button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={cn("px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", billingCycle === 'yearly' ? "bg-white nm-raised text-nm-accent-gold" : "text-nm-text-muted")}
            >
              سنوياً
              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">خصم 20%</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
         {PLANS.map((plan) => (
           <div key={plan.id} className={cn(
             "nm-card relative flex flex-col p-8 transition-all hover:scale-[1.02]",
             plan.isPopular ? "border-2 border-nm-accent-gold shadow-2xl" : "border border-transparent"
           )}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nm-accent-gold text-[#1e293b] px-6 py-1.5 rounded-full text-xs font-bold font-cairo shadow-lg">
                   الخيار الأكثر ملاءمة
                </div>
              )}

              <div className="space-y-6 flex-1">
                 <div className={cn(
                   "w-16 h-16 rounded-3xl nm-inset flex items-center justify-center",
                   plan.color === 'gold' ? 'text-nm-accent-gold' : 
                   plan.color === 'primary' ? 'text-nm-accent-primary' : 'text-gray-400'
                 )}>
                    <plan.icon className="w-8 h-8" />
                 </div>

                 <div>
                    <h3 className="text-xl font-bold font-cairo text-[#1e293b]">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                       <span className="text-4xl font-bold text-[#1e293b]">{plan.price}</span>
                       <span className="text-sm font-bold text-nm-text-muted">ج.م / شهر</span>
                    </div>
                 </div>

                 <p className="text-sm text-nm-text-muted leading-relaxed">{plan.description}</p>

                 <div className="space-y-4 pt-6 pb-10">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                         </div>
                         <span className="text-xs font-semibold text-[#1e293b]">{feature}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <button className={cn(
                "w-full py-4 rounded-2xl font-bold font-cairo tracking-wide transition-all shadow-lg",
                plan.isPopular ? "bg-nm-accent-gold text-[#1e293b] hover:shadow-xl" : "nm-button text-[#1e293b]"
              )}>
                 اشترك الآن
              </button>
           </div>
         ))}
      </div>

      <div className="nm-card bg-[#1e293b] text-white p-10 flex flex-col md:flex-row items-center gap-12 mt-12 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-nm-accent-gold opacity-10 blur-3xl -translate-x-20 -translate-y-20" />
         <div className="w-20 h-20 rounded-full nm-inset flex items-center justify-center text-nm-accent-gold shrink-0 relative z-10">
            <Shield className="w-10 h-10" />
         </div>
         <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-2xl font-bold font-cairo">أمانك الرقمي هو أولويتنا</h3>
            <p className="text-gray-300 leading-relaxed text-sm max-w-3xl">
               نحن نستخدم تشفير AES-256 للمستندات ونطبق معايير متوافقة مع الأنظمة العالمية. بياناتك مشفرة ولا يمكن لأحد الوصول إليها إلا بتصريح منك. جميع عمليات الدفع مؤمنة بواسطة PayMob و Stripe.
            </p>
         </div>
      </div>
    </div>
  );
}
