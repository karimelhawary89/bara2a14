import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, FileText, CheckCircle2, Clock, 
  CreditCard, Brain, Shield, Info, Download,
  ExternalLink, Zap, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const SERVICES = {
  '1': { 
    id: '1', 
    name: 'استعلام عن قضية', 
    category: 'المحاكم', 
    description: 'تتيح هذه الخدمة للمحامي أو الموكل الاستعلام عن الموقف الحالي لأي قضية مقيدة في أي من المحاكم المصرية (الابتدائية، الاستئناف، النقض). يتم تحديث البيانات مباشرة من قاعدة بيانات وزارة العدل المصرية.',
    price: 'مجاني',
    time: 'لحظي (Real-time)',
    requirements: ['رقم القضية', 'سنة القضية', 'نوع المحكمة', 'الدائرة القضائية'],
    steps: [
      'اختيار نوع المحكمة (مدني، جنائي، إلخ)',
      'إدخال رقم القضية والسنة',
      'التحقق من البيانات والمطالبة بالتقرير',
      'تنزيل نسخة PDF رسمية'
    ]
  },
  '2': {
    id: '2',
    name: 'توكيل عام رسمي',
    category: 'التوثيق',
    description: 'تحضير مسودة التوكيل العام الرسمي وحجز موعد في أقرب مكتب توثيق مميكن. براءة AI تراجع الصياغة لتجنب أي ثغرات قانونية قد تمنعك من ممارسة عملك.',
    price: '150 ج.م',
    time: '1 يوم عمل',
    requirements: ['بيانات الموكل (الرقم القومي)', 'بيانات الوكيل (المحامي)', 'غرض التوكيل'],
    steps: [
      'ملء استمارة بيانات الموكل والوكيل',
      'صياغة البنود الخاصة بمساعدة AI',
      'سداد الرسوم الحكومية إلكترونياً',
      'تأكيد الموعد عبر تطبيق أرغب في عمل توكيل'
    ]
  }
};

export default function DigitalServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const service = SERVICES[id as keyof typeof SERVICES] || SERVICES['1'];

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center gap-4">
         <button onClick={() => navigate(-1)} className="nm-button p-2 text-nm-text-muted">
            <ArrowRight className="w-5 h-5 rotate-180" />
         </button>
         <div>
            <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">{service.name}</h1>
            <p className="text-nm-text-muted mt-1">{service.category} | خدمة مميكنة</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="nm-card space-y-6">
               <h3 className="text-xl font-bold font-cairo text-[#1e293b] flex items-center gap-2">
                  <Info className="w-5 h-5 text-nm-accent-gold" />
                  وصف الخدمة
               </h3>
               <p className="text-nm-text-muted leading-relaxed">
                  {service.description}
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 nm-inset rounded-2xl bg-nm-bg flex flex-col items-center text-center gap-2">
                     <Clock className="w-6 h-6 text-blue-500" />
                     <p className="text-xs font-bold text-nm-text-muted uppercase">زمن الإنجاز</p>
                     <p className="font-bold text-[#1e293b]">{service.time}</p>
                  </div>
                  <div className="p-4 nm-inset rounded-2xl bg-nm-bg flex flex-col items-center text-center gap-2">
                     <CreditCard className="w-6 h-6 text-green-500" />
                     <p className="text-xs font-bold text-nm-text-muted uppercase">الرسوم الحكومية</p>
                     <p className="font-bold text-[#1e293b]">{service.price}</p>
                  </div>
               </div>
            </div>

            <div className="nm-card space-y-6">
               <h3 className="text-xl font-bold font-cairo text-[#1e293b]">خطوات التنفيذ</h3>
               <div className="space-y-4">
                  {service.steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full nm-inset flex items-center justify-center font-bold text-[#1e293b] text-sm grow-0 shrink-0">
                          {i + 1}
                       </div>
                       <p className="text-sm font-semibold text-nm-text-muted">{s}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="nm-card bg-[#1e293b] text-white space-y-6">
               <h3 className="text-xl font-bold font-cairo text-nm-accent-gold flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  المساعد الذكي لهذه الخدمة
               </h3>
               <p className="text-sm text-gray-300 leading-relaxed italic border-r-2 border-nm-accent-gold pr-4">
                  "أهلاً أستاذ. لمباشرة الاستعلام عن قضية، يُرجى التأكد من أنك تملك رقم القيد الصحيح. هل تريدني أن أسحب البيانات تلقائياً من بريدك الإلكتروني المربوط؟"
               </p>
               <div className="flex gap-4">
                  <button className="nm-button bg-nm-accent-gold text-[#1e293b] font-bold border-none py-3 px-8">ابدأ المزاوجة الرقمية</button>
                  <button className="nm-button bg-white/10 text-white border-white/5 font-bold">رفع مستندات الخدمة</button>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="nm-card space-y-6">
               <h3 className="font-bold font-cairo text-[#1e293b]">المتطلبات</h3>
               <div className="space-y-3">
                  {service.requirements.map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-3 nm-inset rounded-xl bg-nm-bg">
                       <span className="text-xs font-bold text-nm-text-muted">{req}</span>
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
               </div>
               <button className="w-full nm-button bg-white text-nm-accent-primary font-bold py-3 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  تحميل النماذج المطلوبة
               </button>
            </div>

            <div className="nm-card bg-orange-50 border border-orange-100 space-y-4">
               <div className="flex items-center gap-2 text-orange-700">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="font-bold font-cairo">تنبيه قانوني</h4>
               </div>
               <p className="text-[10px] text-orange-900 leading-relaxed">
                  هذه الخدمة تخضع للرسوم المقررة في قانون الرسوم القضائية المصري الصادر بالقانون رقم 90 لسنة 1944 وتعديلاته. تأكد من صحة البيانات لتجنب البطلان.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
