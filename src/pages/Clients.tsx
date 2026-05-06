import { useState } from 'react';
import { 
  Users, Building2, Landmark, Search, Plus, Filter, 
  RefreshCw, Mic, MoreVertical, Phone, Mail, Globe, 
  AlertTriangle, CreditCard, ChevronRight, X, Brain, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type Client = {
  id: string;
  name: string;
  type: 'فرد' | 'شركة' | 'جهة حكومية' | 'مؤسسة';
  status: 'نشط' | 'محتمل' | 'مؤجل' | 'مغلق';
  phone: string;
  email: string;
  nationality: string;
  riskScore: number;
  paymentBehavior: 'ممتاز' | 'جيد' | 'متأخر';
  registrationDate: string;
};

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'أحمد محمد علي', type: 'فرد', status: 'نشط', phone: '01000867697', email: 'ahmed@mail.com', nationality: 'مصري', riskScore: 25, paymentBehavior: 'ممتاز', registrationDate: '2024-05-01' },
  { id: '2', name: 'شركة النيل للتطوير العقاري', type: 'شركة', status: 'نشط', phone: '01123456789', email: 'info@nile-dev.com', nationality: 'مصرية', riskScore: 45, paymentBehavior: 'جيد', registrationDate: '2024-04-15' },
  { id: '3', name: 'مؤسسة الإخلاص الخيرية', type: 'مؤسسة', status: 'مؤجل', phone: '01234567890', email: 'contact@ekhlas.org', nationality: 'مصرية', riskScore: 15, paymentBehavior: 'ممتاز', registrationDate: '2024-03-20' },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchInput] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.email.includes(searchTerm)
  );

  return (
    <div className="space-y-8 font-tajawal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">العملاء</h1>
          <p className="text-nm-text-muted mt-1">إدارة وتحليل ملفات الموكلين</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2"
           >
              <Plus className="w-5 h-5" />
              <span>عميل جديد</span>
           </button>
           <button className="nm-button p-2 text-nm-text-muted">
              <RefreshCw className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="nm-card flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nm-text-muted" />
           <input 
             type="text" 
             placeholder="ابحث باسم العميل، الهاتف، أو البريد الإلكتروني..." 
             className="w-full nm-input pr-12"
             value={searchTerm}
             onChange={(e) => setSearchInput(e.target.value)}
           />
           <button className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg text-nm-accent-gold">
              <Mic className="w-4 h-4" />
           </button>
        </div>
        <div className="flex gap-4">
           <select className="nm-input bg-transparent min-w-[140px] font-cairo text-sm">
              <option>كافة الحالات</option>
              <option>نشط</option>
              <option>محتمل</option>
              <option>مؤجل</option>
           </select>
           <button className="nm-button flex items-center gap-2 text-nm-text-muted">
              <Filter className="w-4 h-4" />
              <span>فلاتر</span>
           </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div 
              key={client.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="nm-card cursor-pointer group hover:scale-[1.02] transition-all relative overflow-hidden"
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg">
                    {client.type === 'فرد' ? <Users className="w-6 h-6 text-blue-500" /> : 
                     client.type === 'شركة' ? <Building2 className="w-6 h-6 text-orange-500" /> : 
                     <Landmark className="w-6 h-6 text-teal-500" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1e293b] leading-tight">{client.name}</h3>
                    <p className="text-xs text-nm-text-muted mt-1">{client.type} | EML-00{client.id}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full border text-[10px] font-bold font-cairo",
                  client.status === 'نشط' ? "bg-green-100 text-green-700 border-green-200" :
                  client.status === 'محتمل' ? "bg-blue-100 text-blue-700 border-blue-200" :
                  "bg-gray-100 text-gray-700 border-gray-200"
                )}>
                  {client.status}
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-white/20">
                <div className="flex items-center gap-3 text-sm text-nm-text-secondary">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-nm-text-secondary">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                   <div className="flex justify-between text-[10px] font-bold text-nm-text-muted mb-1 font-cairo uppercase tracking-wider">
                      <span>مستوى المخاطر AI</span>
                      <span className={cn(client.riskScore > 40 ? "text-red-500" : "text-green-600")}>{client.riskScore}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-1000", client.riskScore > 40 ? "bg-red-500" : "bg-green-500")} 
                        style={{ width: `${client.riskScore}%` }} 
                      />
                   </div>
                </div>
                
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-nm-accent-gold" />
                      <span className="text-[10px] font-bold text-nm-text-muted">سلوك الدفع: <span className="text-[#1e293b]">{client.paymentBehavior}</span></span>
                   </div>
                   <button className="p-1 hover:nm-inset rounded-lg text-nm-accent-gold">
                      <ChevronRight className="w-5 h-5 rotate-180" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredClients.length === 0 && (

          <div className="col-span-full py-20 text-center space-y-4 nm-card bg-transparent shadow-none border-2 border-dashed border-gray-300">
             <div className="w-20 h-20 nm-inset rounded-full mx-auto flex items-center justify-center text-gray-300">
                <Users className="w-10 h-10" />
             </div>
             <p className="font-cairo text-lg text-nm-text-muted">لا يوجد موكلون يطابقون بحثك</p>
             <button onClick={() => setSearchInput('')} className="text-nm-accent-primary font-bold">إعادة الضبط</button>
          </div>
        )}
      </div>

      {/* Client Detail Drawer (Side Panel Mock) */}
      <AnimatePresence>
        {selectedClient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[2100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-nm-bg z-[2200] shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-nm-bg z-10 p-6 flex items-center justify-between border-b border-white/20 shadow-sm">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedClient(null)} className="nm-button p-2 text-nm-text-muted">
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-bold font-cairo">ملف الموكل</h2>
                </div>
                <div className="flex gap-2">
                  <button className="nm-button text-nm-accent-primary">تعديل</button>
                  <button className="nm-button bg-nm-accent-danger text-white border-none">حذف</button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                 <div className="flex flex-col md:flex-row items-center gap-8 md:items-start">
                    <div className="w-32 h-32 rounded-3xl nm-raised flex items-center justify-center bg-nm-bg relative">
                       <Users className="w-16 h-16 text-gray-400" />
                       <div className="absolute -bottom-2 -right-2 bg-nm-accent-gold text-white p-2 rounded-xl nm-raised border-2 border-nm-bg">
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-center md:text-right">
                       <h3 className="text-3xl font-bold text-[#1e293b] mb-2">{selectedClient.name}</h3>
                       <div className="flex flex-wrap justify-center md:justify-start gap-2">
                          <span className="px-3 py-1 bg-white/50 nm-inset rounded-lg text-xs font-bold">{selectedClient.type}</span>
                          <span className="px-3 py-1 bg-nm-accent-gold/20 text-nm-accent-gold rounded-lg text-xs font-bold">{selectedClient.status}</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">{selectedClient.nationality}</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="nm-card space-y-4">
                       <h4 className="font-bold font-cairo text-nm-accent-gold border-b border-white/20 pb-2">بيانات التواصل</h4>
                       <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-3">
                             <Phone className="w-5 h-5 text-nm-text-muted" />
                             <div>
                                <p className="text-[10px] text-nm-text-muted font-bold font-cairo uppercase">رقم الهاتف</p>
                                <p className="font-semibold" dir="ltr">{selectedClient.phone}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <Mail className="w-5 h-5 text-nm-text-muted" />
                             <div>
                                <p className="text-[10px] text-nm-text-muted font-bold font-cairo uppercase">البريد الإلكتروني</p>
                                <p className="font-semibold">{selectedClient.email}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="nm-card space-y-4">
                       <h4 className="font-bold font-cairo text-nm-accent-gold border-b border-white/20 pb-2">التحليل المالي AI</h4>
                       <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-3">
                             <CreditCard className="w-5 h-5 text-nm-text-muted" />
                             <div>
                                <p className="text-[10px] text-nm-text-muted font-bold font-cairo uppercase">سلوك الدفع</p>
                                <p className="font-semibold">{selectedClient.paymentBehavior}</p>
                             </div>
                          </div>
                          <div>
                             <p className="text-[10px] text-nm-text-muted font-bold font-cairo uppercase mb-2">القيمة المتوقعة (LTV)</p>
                             <p className="text-xl font-bold text-green-600">85,000 EGP</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="nm-card bg-[#1e293b] text-white">
                    <h4 className="font-bold font-cairo text-nm-accent-gold flex items-center gap-2 mb-4">
                       <Brain className="w-5 h-5" />
                       تحليل براءة AI لملف الموكل
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90">
                       بناءً على البيانات المتاحة، العميل يتمتع بسجل دفع ممتاز. هناك مخاطرة منخفضة (25%) تتعلق بنزاع عقاري سابق. يُنصح بالتركيز على خدمات الاستشارات الضريبية نظراً للتوسع الأخير في نشاطه التجاري.
                    </p>
                    <button className="mt-6 nm-button bg-nm-accent-gold text-[#1e293b] border-none w-full font-bold">توليد تقرير شامل</button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Client Modal Mock */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[3000] flex items-center justify-center p-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="nm-card w-full max-w-lg p-10 space-y-8"
           >
              <h2 className="text-3xl font-bold font-cairo text-center">إضافة موكل جديد</h2>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold font-cairo mr-2">اسم الموكل*</label>
                    <input type="text" placeholder="الاسم الرباعي" className="w-full nm-input" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-2">النوع</label>
                       <select className="w-full nm-input bg-transparent">
                          <option>فرد</option>
                          <option>شركة</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold font-cairo mr-2">الدولة/الجنسية</label>
                       <input type="text" placeholder="مصر" className="w-full nm-input" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold font-cairo mr-2">رقم الهاتف</label>
                    <input type="tel" placeholder="01XXXXXXXXX" className="w-full nm-input text-left" dir="ltr" />
                 </div>
              </div>
              <div className="flex gap-4 pt-4">
                 <button onClick={() => setIsAddModalOpen(false)} className="nm-button flex-1 text-nm-text-muted">إلغاء</button>
                 <button onClick={() => { setIsAddModalOpen(false); toast.success('تمت إضافة العميل بنجاح'); }} className="nm-button flex-1 bg-nm-accent-gold text-[#1e293b]">حفظ البيانات</button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
}

function CheckCircle2(props: any) {
  return <CheckCircle {...props} />;
}
