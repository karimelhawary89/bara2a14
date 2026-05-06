import { useState } from 'react';
import { 
  MessageCircle, Search, MoreVertical, Phone, 
  Video, Send, CheckCircle2, Bot, Brain,
  Clock, Plus, Mic, Paperclip, Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const MOCK_CHATS = [
  { id: '1', name: 'أحمد محمد علي', phone: '+20 100 086 7697', lastMsg: 'تمام يا فندم، بانتظار مسودة العقد.', time: '10:30 ص', unread: 2, status: 'نشط' },
  { id: '2', name: 'شركة النيل للتطوير', phone: '+20 112 345 6789', lastMsg: 'متى موعد الجلسة القادمة؟', time: 'أمس', unread: 0, status: 'محتمل' },
  { id: '3', name: 'مكتب الهواري للمحاماة', phone: '+20 120 000 0000', lastMsg: 'تم تحويل الأتعاب.', time: 'الإثنين', unread: 0, status: 'فريق' },
];

export default function WhatsAppInbox() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="h-[calc(100vh-140px)] nm-card p-0 flex overflow-hidden font-tajawal">
      
      {/* Chats Sidebar */}
      <div className="w-80 border-l border-white/20 flex flex-col bg-[#1e293b] text-white">
        <div className="p-6 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-cairo">الرسائل</h2>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-white/10 rounded-lg"><Plus className="w-5 h-5" /></button>
                 <button className="p-2 hover:bg-white/10 rounded-lg"><MoreVertical className="w-5 h-5" /></button>
              </div>
           </div>
           <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="ابحث في المحادثات..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
           {MOCK_CHATS.map((chat) => (
             <div 
               key={chat.id}
               onClick={() => setSelectedChat(chat)}
               className={cn(
                 "px-6 py-4 flex items-start gap-4 cursor-pointer transition-all border-r-4",
                 selectedChat.id === chat.id ? "bg-white/10 border-nm-accent-gold" : "hover:bg-white/5 border-transparent"
               )}
             >
                <div className="w-12 h-12 rounded-2xl bg-nm-bg nm-inset flex items-center justify-center text-[#1e293b] font-bold text-lg">
                   {chat.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                      <span className="text-[10px] text-gray-400">{chat.time}</span>
                   </div>
                   <p className="text-xs text-gray-400 truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-nm-accent-gold text-[#1e293b] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center mt-1">
                     {chat.unread}
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-nm-bg">
        {/* Header */}
        <div className="p-6 bg-white/50 backdrop-blur-md flex items-center justify-between border-b border-white/20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl nm-inset flex items-center justify-center font-bold text-[#1e293b]">
                 {selectedChat.name[0]}
              </div>
              <div>
                 <h3 className="font-bold font-cairo text-[#1e293b]">{selectedChat.name}</h3>
                 <p className="text-[10px] text-nm-text-muted">{selectedChat.phone} | <span className="text-green-600 font-bold uppercase">{selectedChat.status}</span></p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="nm-button p-2 text-nm-text-muted"><Phone className="w-5 h-5" /></button>
              <button className="nm-button p-2 text-nm-text-muted"><Video className="w-5 h-5" /></button>
              <button className="nm-button p-2 text-nm-text-muted"><MoreVertical className="w-5 h-5" /></button>
           </div>
        </div>

        {/* Message View */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white/20">
           <div className="flex flex-col items-center">
              <span className="px-4 py-1 bg-nm-bg nm-inset rounded-full text-[10px] font-bold text-nm-text-muted uppercase mb-8">اليوم</span>
           </div>

           <div className="flex flex-col gap-6">
              {/* Received */}
              <div className="flex gap-4 max-w-[80%] items-end">
                 <div className="bg-white nm-raised p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed border border-gray-100">
                    مرحباً أستاذ، هل هناك أي جديد في موضوع دعوى التفويض؟ الموكل يسألني باستمرار.
                 </div>
                 <span className="text-[9px] text-nm-text-muted mb-1 uppercase">10:00 ص</span>
              </div>

              {/* Sent */}
              <div className="flex flex-row-reverse gap-4 max-w-[80%] self-end items-end">
                 <div className="bg-nm-accent-gold text-[#1e293b] nm-raised p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed font-semibold shadow-xl">
                    أهلاً بك. تم تقديم المذكرة أمس وفي انتظار قرار المحكمة بالإحالة للخبراء. سأوافيك بالتفاصيل فور صدور القرار.
                 </div>
                 <div className="flex flex-col gap-1 items-end">
                    <span className="text-[9px] text-nm-text-muted uppercase">10:15 ص</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                 </div>
              </div>

              {/* AI Auto-Trigger Suggestion */}
              <div className="nm-card bg-purple-50 border border-purple-100 flex items-start gap-4 p-4 max-w-md mx-auto">
                 <div className="w-10 h-10 rounded-xl bg-white nm-raised flex items-center justify-center shrink-0">
                    <Brain className="w-5 h-5 text-purple-600" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-xs font-bold text-purple-900 font-cairo">اقتراح رد ذكي من براءة AI</p>
                    <p className="text-[10px] text-purple-700 italic">"يمكنك إرسال نسخة من قرار المحكمة السابق بصيغة PDF لزيادة اطمئنان العميل."</p>
                    <div className="flex gap-2 pt-2">
                       <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold shadow-md">إرسال الاقتراح</button>
                       <button className="px-3 py-1 bg-white border border-purple-200 text-purple-600 rounded-lg text-[10px] font-bold">تعديل</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-nm-bg border-t border-white/20">
           <div className="nm-inset bg-white p-2 rounded-2xl flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-50 rounded-xl text-nm-text-muted"><Smile className="w-5 h-5" /></button>
              <button className="p-2.5 hover:bg-gray-50 rounded-xl text-nm-text-muted"><Paperclip className="w-5 h-5" /></button>
              <input 
                type="text" 
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="اكتب رسالة..." 
                className="flex-1 bg-transparent border-none outline-none p-2 text-sm"
              />
              <button className="p-2.5 hover:bg-gray-50 rounded-xl text-nm-accent-gold"><Mic className="w-5 h-5" /></button>
              <button className={cn(
                "p-3 rounded-xl transition-all",
                msgInput.trim() ? "bg-green-500 text-white shadow-lg" : "text-gray-300"
              )}>
                 <Send className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

    </div>
  );
}
