import { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Download, 
  Trash2, Eye, Brain, Clock, Shield, CheckCircle2, 
  AlertCircle, Share2, Copy 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type Doc = {
  id: string;
  title: string;
  type: string;
  matterTitle: string;
  date: string;
  status: 'مسودة' | 'نهائي' | 'مُصادق';
  riskLevel: 'آمن' | 'مخاطر منخفضة' | 'مخاطر عالية' | 'لم يُحلَّل';
};

const MOCK_DOCS: Doc[] = [
  { id: '1', title: 'عقد بيع شقة سكنية', type: 'عقد', matterTitle: 'نزاع عقار المعادي', date: '2024-04-10', status: 'مسودة', riskLevel: 'لم يُحلَّل' },
  { id: '2', title: 'صحيفة دعوى تعويض', type: 'صحيفة دعوى', matterTitle: 'دعوى تعويض عمالي', date: '2024-03-25', status: 'نهائي', riskLevel: 'آمن' },
  { id: '3', title: 'مذكرة دفاع في نقض', type: 'مذكرة', matterTitle: 'خلاف عقد سيارات', date: '2024-04-15', status: 'نهائي', riskLevel: 'مخاطر منخفضة' },
];

export default function Documents() {
  const [docs, setDocs] = useState<Doc[]>(MOCK_DOCS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = (docId: string) => {
    setIsAnalyzing(true);
    toast.info('براءة AI تقوم بتحليل المستند...');
    
    // Simulate AI analysis
    setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult({ id: docId, summary: 'العقد يتوافق مع القانون المدني المصري. تم اكتشاف مخاطرة في بند الشرط الجزائي.' });
        setDocs(prev => prev.map(d => d.id === docId ? { ...d, riskLevel: 'مخاطر منخفضة' } : d));
        toast.success('اكتمل تحليل المستند!');
    }, 2500);
  };

  return (
    <div className="space-y-8 font-tajawal pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-[#1e293b]">المستندات</h1>
          <p className="text-nm-text-muted mt-1">أرشفة ذكية وتحليل العقود بالذكاء الاصطناعي</p>
        </div>
        <div className="flex gap-4">
           <button className="nm-button bg-white text-nm-accent-primary flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span>استيراد ذكي OCR</span>
           </button>
           <button className="nm-button bg-nm-accent-gold text-[#1e293b] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>مستند جديد</span>
           </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="nm-card flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nm-text-muted" />
            <input type="text" placeholder="ابحث في عنوان المستند أو اسم القضية..." className="w-full nm-input pr-12" />
         </div>
         <div className="flex gap-4">
            <button className="nm-button flex items-center gap-2 text-nm-text-muted">
               <Filter className="w-4 h-4" />
               <span>فلاتر</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <div key={doc.id} className="nm-card group relative p-0 overflow-hidden flex flex-col h-full transition-all hover:scale-[1.02]">
             <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                   <div className="w-12 h-12 rounded-2xl nm-inset flex items-center justify-center bg-nm-bg">
                      <FileText className="w-6 h-6 text-nm-accent-primary" />
                   </div>
                   <div className={cn(
                     "px-3 py-1 rounded-full text-[10px] font-bold font-cairo",
                     doc.status === 'مُصادق' ? "bg-green-100 text-green-700" :
                     doc.status === 'نهائي' ? "bg-blue-100 text-blue-700" :
                     "bg-gray-100 text-gray-700"
                   )}>
                      {doc.status}
                   </div>
                </div>

                <div>
                   <h3 className="text-lg font-bold text-[#1e293b] leading-tight group-hover:text-nm-accent-gold transition-colors">{doc.title}</h3>
                   <p className="text-xs text-nm-text-muted mt-1 uppercase tracking-tight">{doc.matterTitle}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-4 border-t border-white/20">
                   <div className="flex items-center gap-2 text-nm-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{doc.date}</span>
                   </div>
                   <span className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-lg font-bold">{doc.type}</span>
                </div>
             </div>

             <div className="mt-auto p-4 bg-nm-bg border-t border-white/20 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Shield className={cn("w-4 h-4", 
                        doc.riskLevel === 'آمن' ? 'text-green-500' : 
                        doc.riskLevel === 'مخاطر منخفضة' ? 'text-orange-500' : 'text-gray-400'
                      )} />
                      <span className="text-[10px] font-bold text-nm-text-muted">الحماية: <span className="text-[#1e293b]">{doc.riskLevel}</span></span>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 hover:nm-raised rounded-lg text-nm-text-muted hover:text-nm-accent-primary">
                         <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:nm-raised rounded-lg text-nm-text-muted hover:text-nm-accent-gold">
                         <Share2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <button 
                  onClick={() => handleAnalyze(doc.id)}
                  disabled={isAnalyzing}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-xs font-bold font-cairo flex items-center justify-center gap-2 transition-all",
                    isAnalyzing ? "bg-nm-bg nm-inset text-nm-text-muted" : "nm-button bg-white text-purple-600 border border-purple-100 hover:nm-pressed"
                  )}
                >
                   {isAnalyzing ? (
                     <>
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span>جاري التحليل العلمي...</span>
                     </>
                   ) : (
                     <>
                        <Brain className="w-4 h-4" />
                        <span>تحليل براءة AI للمخاطر</span>
                     </>
                   )}
                </button>
             </div>

             {analysisResult?.id === doc.id && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="px-6 pb-6 bg-purple-50/50 border-t border-purple-100"
               >
                  <div className="pt-4 flex items-start gap-3">
                     <AlertCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                     <p className="text-[10px] text-purple-800 leading-relaxed italic">{analysisResult.summary}</p>
                  </div>
                  <button className="mt-4 text-[10px] font-bold text-purple-600 underline">عرض التحليل المفصل ←</button>
               </motion.div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}
