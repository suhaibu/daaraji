
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResourceType, Language } from '../types';
import { ICONS } from '../constants';

const ResourceDetail: React.FC = () => {
  const { id } = useParams();

  // Mock data fetching
  const resource = {
    id: id || '1',
    title: 'كتاب "تزود الصغار" في العقيدة والعبادة',
    author: 'الشيخ أحمد بمب خادم الرسول',
    type: ResourceType.FIQH,
    language: Language.ARABIC,
    description: 'منظومة تعليمية مبسطة في العقيدة والعبادة والآداب، موجهة للناشئة وطلاب العلم. تمتاز بسلاسة العبارة وعمق المعنى، وتعد من ركائز المنهج التربوي في الطريقة المريدية.',
    tags: ['عقيدة', 'عبادة', 'تعليم', 'تربية'],
    source: 'مكتبة طوبى المركزية',
    fileType: 'pdf',
    dateCreated: '1330 هـ',
    addedBy: 'أحمد فال',
    createdAt: '2024-09-20',
    fileSize: '2.4 MB',
    pages: 45
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <nav className="flex items-center gap-2 text-stone-400 text-sm mb-2">
            <Link to="/library" className="hover:text-emerald-700">المكتبة</Link>
            <span>/</span>
            <span className="text-stone-600">{resource.title}</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-800">{resource.title}</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
            تعديل
          </button>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2">
             تحميل المرجع
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
             <h3 className="text-xl font-bold text-stone-800 mb-6 border-b border-stone-50 pb-4">معلومات المرجع</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
               <div>
                 <p className="text-xs text-stone-400 mb-1">المؤلف</p>
                 <p className="text-lg font-bold text-emerald-700">{resource.author}</p>
               </div>
               <div>
                 <p className="text-xs text-stone-400 mb-1">التصنيف</p>
                 <p className="text-lg font-bold text-stone-700">{resource.type}</p>
               </div>
               <div>
                 <p className="text-xs text-stone-400 mb-1">اللغة الأصلية</p>
                 <p className="text-lg font-bold text-stone-700">{resource.language}</p>
               </div>
               <div>
                 <p className="text-xs text-stone-400 mb-1">تاريخ التأليف التقديري</p>
                 <p className="text-lg font-bold text-stone-700">{resource.dateCreated}</p>
               </div>
               <div>
                 <p className="text-xs text-stone-400 mb-1">المصدر</p>
                 <p className="text-lg font-bold text-stone-700">{resource.source}</p>
               </div>
               <div>
                 <p className="text-xs text-stone-400 mb-1">عدد الصفحات / الحجم</p>
                 <p className="text-lg font-bold text-stone-700">{resource.pages} صفحة ({resource.fileSize})</p>
               </div>
             </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
             <h3 className="text-xl font-bold text-stone-800 mb-4">نبذة عن المحتوى</h3>
             <p className="text-stone-600 leading-relaxed text-lg font-serif-ar">
               {resource.description}
             </p>
             <div className="mt-8 flex flex-wrap gap-2">
               {resource.tags.map(tag => (
                 <span key={tag} className="bg-stone-50 text-stone-500 px-4 py-1.5 rounded-full text-sm border border-stone-100">
                    #{tag}
                 </span>
               ))}
             </div>
          </section>

          <section className="bg-stone-100 p-8 rounded-2xl border border-dashed border-stone-300">
             <div className="flex flex-col items-center justify-center text-center py-12">
               <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                 <ICONS.File />
               </div>
               <h4 className="text-xl font-bold text-stone-700 mb-2">معاينة الملف المرفق</h4>
               <p className="text-stone-500 max-w-sm">المعاينة المباشرة للملفات قيد التطوير. يمكنك تحميل الملف حالياً لعرضه على جهازك.</p>
               <button className="mt-6 text-emerald-700 font-bold hover:underline">فتح الملف في نافذة جديدة</button>
             </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
             <h4 className="font-bold text-stone-800 mb-4 border-b pb-2">سجل الأرشفة</h4>
             <div className="space-y-4">
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">أ</div>
                 <div>
                   <p className="text-sm font-bold text-stone-700">أضيفت بواسطة {resource.addedBy}</p>
                   <p className="text-[10px] text-stone-400">{resource.createdAt}</p>
                 </div>
               </div>
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">ن</div>
                 <div>
                   <p className="text-sm font-bold text-stone-700">تم فحص الملف تقنياً</p>
                   <p className="text-[10px] text-stone-400">2024-09-21</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
             <h4 className="font-bold text-emerald-900 mb-3">جاهزية الذكاء الاصطناعي</h4>
             <p className="text-xs text-emerald-800 leading-relaxed mb-4">
               تمت أرشفة هذا المرجع في قاعدة البيانات الهيكلية. هذا المرجع جاهز الآن ليكون مصدراً لمحركات البحث الذكية والتلخيص الآلي.
             </p>
             <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               الحالة: متوافق برمجياً
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
             <h4 className="font-bold text-stone-800 mb-4">مراجع مشابهة</h4>
             <div className="space-y-3">
               <Link to="#" className="block text-sm text-stone-600 hover:text-emerald-700 transition-colors">
                 • منظومة "جذبة الصغار"
               </Link>
               <Link to="#" className="block text-sm text-stone-600 hover:text-emerald-700 transition-colors">
                 • شرح نظم تزود الصغار للشيخ مباكي
               </Link>
               <Link to="#" className="block text-sm text-stone-600 hover:text-emerald-700 transition-colors">
                 • الدرر السنية في العقائد المريدية
               </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
