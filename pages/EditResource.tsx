
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ResourceType, Language } from '../types';
import { ICONS } from '../constants';

const EditResource: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    type: ResourceType.POEM,
    language: Language.ARABIC,
    dateCreated: '',
    description: '',
    tags: '',
    source: '',
    driveLink: '',
  });
  const [file, setFile] = useState<File | null>(null);

  // Mock fetching existing data
  useEffect(() => {
    // In real app: const data = await fetchResource(id);
    setFormData({
      title: 'كتاب "تزود الصغار" في العقيدة والعبادة',
      author: 'الشيخ أحمد بمب خادم الرسول',
      type: ResourceType.FIQH,
      language: Language.ARABIC,
      dateCreated: '1330 هـ',
      description: 'منظومة تعليمية مبسطة في العقيدة والعبادة والآداب، موجهة للناشئة وطلاب العلم. تمتاز بسلاسة العبارة وعمق المعنى، وتعد من ركائز المنهج التربوي في الطريقة المريدية.',
      tags: 'عقيدة, عبادة, تعليم, تربية',
      source: 'مكتبة طوبى المركزية',
      driveLink: '',
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('تم تحديث المرجع بنجاح!');
      navigate(`/resource/${id}`);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <header className="flex items-center justify-between">
        <div>
          <nav className="flex items-center gap-2 text-stone-400 text-sm mb-2">
            <Link to="/library" className="hover:text-emerald-700">المكتبة</Link>
            <span>/</span>
            <Link to={`/resource/${id}`} className="hover:text-emerald-700">المرجع</Link>
            <span>/</span>
            <span className="text-stone-600">تعديل</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">تعديل المرجع</h1>
          <p className="text-stone-500">تحديث البيانات الوصفية أو استبدال ملف المرجع.</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-stone-500 hover:text-stone-800 font-bold px-4 py-2"
        >
          إلغاء التعديل
        </button>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
            <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">المعلومات الأساسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">عنوان المرجع *</label>
                <input 
                  type="text" required
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">اسم المؤلف *</label>
                <input 
                  type="text" required
                  value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">نوع المرجع</label>
                <select 
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as ResourceType})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {Object.values(ResourceType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">وصف المرجع</label>
              <textarea 
                rows={6}
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">الكلمات المفتاحية</label>
                <input 
                  type="text"
                  value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">تاريخ التأليف</label>
                <input 
                  type="text"
                  value={formData.dateCreated} onChange={(e) => setFormData({...formData, dateCreated: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
            <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">تحديث الملف</h3>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                file ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-emerald-400'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef} type="file" className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center">
                <ICONS.Upload />
                <p className="mt-4 font-bold text-stone-700">
                  {file ? file.name : 'استبدال الملف الحالي'}
                </p>
                <p className="text-xs text-stone-400 mt-2">اتركه فارغاً للاحتفاظ بالملف الحالي</p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button 
                type="submit" disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <span>تحديث البيانات</span>}
              </button>
            </div>
          </div>

          <div className="bg-stone-800 p-6 rounded-2xl text-white">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              ملاحظة التعديل
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              تعديل المراجع يخضع لسياسة التدقيق. سيتم مراجعة التحديثات من قبل لجنة الأرشفة قبل اعتمادها بشكل نهائي في النسخة العامة.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditResource;
