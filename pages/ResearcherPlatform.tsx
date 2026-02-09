
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ICONS } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ProjectDraft {
  title: string;
  chapters: { title: string; content: string }[];
}

const ResearcherPlatform: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بك في منصة الباحثين المريدية. يمكنني مساعدتك في استنباط المعلومات من التراث المريدي، تلخيص المراجع، أو حتى بناء مسودات لمشاريع كتب علمية. بماذا نبدأ اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [project, setProject] = useState<ProjectDraft>({
    title: 'مشروع كتاب جديد',
    chapters: []
  });
  const [activeTab, setActiveTab] = useState<'chat' | 'project'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, userMsg].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: 'أنت مساعد بحث علمي متخصص في التراث المريدي (الطريقة المريدية). مهمتك هي مساعدة الباحثين في تحليل المراجع، تقديم إجابات دقيقة بناءً على المعرفة المريدية الموثقة، ومساعدتهم في صياغة مشاريع كتب علمية رصينة بأسلوب لغوي راقٍ.',
          thinkingConfig: { thinkingBudget: 1000 }
        }
      });

      const assistantMsg: Message = { role: 'assistant', content: response.text || 'عذراً، لم أتمكن من معالجة الطلب.' };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'حدث خطأ أثناء التواصل مع محرك الذكاء الاصطناعي. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const addToProject = (text: string) => {
    const chapterTitle = `فصل: ${text.substring(0, 30)}...`;
    setProject(prev => ({
      ...prev,
      chapters: [...prev.chapters, { title: chapterTitle, content: text }]
    }));
    setActiveTab('project');
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-4 animate-fadeIn">
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <ICONS.Researcher />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">منصة الباحثين الذكية</h1>
            <p className="text-sm text-stone-500">حوار معرفي، تحليل معمق، وبناء مشاريع علمية.</p>
          </div>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'chat' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-500'}`}
          >
            <ICONS.Send />
            الحوار المعرفي
          </button>
          <button 
            onClick={() => setActiveTab('project')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'project' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-500'}`}
          >
            <ICONS.Book />
            مشروع الكتاب ({project.chapters.length})
          </button>
        </div>
      </header>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Section */}
        <div className={`flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden ${activeTab !== 'chat' && 'hidden lg:flex'}`}>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-5 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-stone-100 text-stone-800 rounded-tr-none' 
                  : 'bg-emerald-900 text-white rounded-tl-none font-serif-ar leading-relaxed text-lg'
                }`}>
                  {msg.content}
                  {msg.role === 'assistant' && idx !== 0 && (
                    <div className="mt-4 pt-4 border-t border-emerald-800 flex justify-end">
                      <button 
                        onClick={() => addToProject(msg.content)}
                        className="text-xs bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <ICONS.Add />
                        إضافة لمسودة الكتاب
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-emerald-900/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-6 bg-stone-50 border-t border-stone-100">
            <div className="flex gap-3">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل عن مسألة، اطلب تلخيصاً، أو ابدأ فصلاً جديداً..."
                className="flex-1 px-6 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-2xl shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
              >
                <ICONS.Send />
              </button>
            </div>
          </div>
        </div>

        {/* Project Draft Section */}
        <div className={`w-full lg:w-96 flex flex-col bg-stone-800 rounded-3xl text-white overflow-hidden shadow-2xl ${activeTab !== 'project' && 'hidden lg:flex'}`}>
          <div className="p-6 border-b border-stone-700 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <ICONS.Book />
              مسودة المشروع
            </h3>
            <button className="text-xs bg-stone-700 hover:bg-stone-600 px-3 py-1.5 rounded-lg">تصدير PDF</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <input 
              type="text" 
              value={project.title}
              onChange={(e) => setProject({...project, title: e.target.value})}
              className="w-full bg-transparent text-xl font-bold border-none focus:ring-0 placeholder-stone-600 text-amber-400"
              placeholder="عنوان الكتاب..."
            />
            
            {project.chapters.length === 0 ? (
              <div className="py-20 text-center text-stone-500">
                <p className="text-sm">لا توجد فصول مضافة بعد.</p>
                <p className="text-xs mt-2">استخدم الحوار المعرفي وأضف الإجابات المهمة هنا.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {project.chapters.map((chap, i) => (
                  <div key={i} className="bg-stone-700/50 p-4 rounded-xl border border-stone-600 group relative">
                    <button 
                      onClick={() => setProject({...project, chapters: project.chapters.filter((_, idx) => idx !== i)})}
                      className="absolute top-2 left-2 text-stone-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ICONS.Delete />
                    </button>
                    <h4 className="font-bold text-sm mb-2 text-stone-200">{chap.title}</h4>
                    <p className="text-[10px] text-stone-400 line-clamp-3">{chap.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-stone-900">
            <div className="bg-amber-400/10 border border-amber-400/20 p-4 rounded-2xl">
              <h5 className="text-amber-400 font-bold text-xs mb-1">الذكاء الاصطناعي يقترح:</h5>
              <p className="text-[10px] text-stone-400 leading-relaxed">
                بناءً على حوارك الأخير، يمكنك ربط "مسالك الجنان" بمفهوم التربية السلوكية في الفصل القادم.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherPlatform;
