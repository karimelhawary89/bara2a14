import { useState } from 'react';
import { 
  Receipt, Plus, Filter, Search, Download, 
  Trash2, Eye, Printer, Send, CreditCard, 
  TrendingUp, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

type Invoice = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  matterTitle: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'مسودة' | 'مُرسلة' | 'مدفوعة' | 'متأخرة';
};

const MOCK_INVOICES: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', clientName: 'شركة النيل', matterTitle: 'نزاع المعادي', date: '2024-04-10', dueDate: '2024-05-10', amount: 15000, paid: 5000, status: 'مُرسلة' },
  { id: '2', invoiceNumber: 'INV-2024-002', clientName: 'أحمد محمد', matterTitle: 'تعويض عمالي', date: '2024-03-20', dueDate: '2024-04-20', amount: 8500, paid: 8500, status: 'مدفوعة' },
  { id: '3', invoiceNumber: 'INV-2024-003', clientName: 'مؤسسة الإخلاص', matterTitle: 'خلاف عقد سيارات', date: '2024-04-15', dueDate: '2024-05-15', amount: 22000, paid: 0, status: 'متأخرة' },
];

export default function Invoices() {
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES);

  const formatEGP = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(amount);
  };

  return (
    <div className="space-y-8 font-tajawal">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">الفواتير والمالية</h1>
          <p className="text-nm-text-muted mt-1">تتبع الأتعاب، الفواتير، والمدفوعات</p>
        </div>
        <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>فاتورة جديدة</span>
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "المحصل هذا الشهر", value: 13500, icon: TrendingUp, color: "text-green-500" },
          { label: "فواتير معلقة", value: 32000, icon: Clock, color: "text-orange-500" },
          { label: "مبالغ متأخرة", value: 8500, icon: AlertCircle, color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="nm-card flex items-center gap-6">
            <div className={cn("w-14 h-14 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg", stat.color)}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-nm-text-muted font-cairo mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#1e293b]">{formatEGP(stat.value)}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="nm-card">
         <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nm-text-muted" />
               <input type="text" placeholder="البحث برقم الفاتورة أو العميل..." className="w-full nm-input pr-10 py-2.5 text-sm" />
            </div>
            <div className="flex gap-4">
               <button className="nm-button flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4" />
                  <span>فلاتر</span>
               </button>
               <button className="nm-button flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>تصدير CSV</span>
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead>
                  <tr className="border-b border-white/20">
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase">رقم الفاتورة</th>
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase">العميل</th>
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase">التاريخ</th>
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase">الإجمالي</th>
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase">الحالة</th>
                     <th className="pb-4 font-cairo font-bold text-xs text-nm-text-muted uppercase text-left">إجراءات</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/10">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="group hover:bg-white/10 transition-colors">
                       <td className="py-6">
                          <span className="font-bold text-[#1e293b]">{inv.invoiceNumber}</span>
                          <p className="text-[10px] text-nm-text-muted mt-1">{inv.matterTitle}</p>
                       </td>
                       <td className="py-6 font-semibold">{inv.clientName}</td>
                       <td className="py-6">
                          <p className="text-sm">{inv.date}</p>
                          <p className="text-[10px] text-red-400 mt-1">الاستحقاق: {inv.dueDate}</p>
                       </td>
                       <td className="py-6">
                          <span className="font-bold text-lg">{inv.amount.toLocaleString()}</span>
                          <span className="text-[10px] mr-1 text-nm-text-muted">EGP</span>
                       </td>
                       <td className="py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold font-cairo",
                            inv.status === 'مدفوعة' ? "bg-green-100 text-green-700" :
                            inv.status === 'متأخرة' ? "bg-red-100 text-red-700" :
                            "bg-blue-100 text-blue-700"
                          )}>
                             {inv.status}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="flex justify-end gap-2">
                             <button className="p-2 hover:nm-raised rounded-lg transition-all text-nm-text-muted hover:text-nm-accent-gold" title="عرض">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-2 hover:nm-raised rounded-lg transition-all text-nm-text-muted hover:text-nm-accent-primary" title="طباعة">
                                <Printer className="w-4 h-4" />
                             </button>
                             <button className="p-2 hover:nm-raised rounded-lg transition-all text-nm-text-muted hover:text-nm-accent-success" title="إرسال">
                                <Send className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
