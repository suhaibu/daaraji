
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceType, Language } from '../types';
import { ICONS } from '../constants';

const AddResource: React.FC = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate upload and saving
    setTimeout(() => {
      setLoading(false);
      alert('تمت إضافة المرجع بنجاح!');
      navigate('/library');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">إضافة مرجع جديد</h1>
        <p className="text-stone-500">أدخل البيانات الوصفية وارفع الملف الخاص بالمرجع.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
            <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">المعلومات الأساسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">عنوان المرجع *</label>
                <input 
                  type="text" name="title" required
                  value={formData.title} onChange={handleInputChange}
                  placeholder="مثال: كتاب تزود الشبان"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">اسم المؤلف *</label>
                <input 
                  type="text" name="author" required
                  value={formData.author} onChange={handleInputChange}
                  placeholder="اسم المؤلف أو الناظم"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">تاريخ التأليف (اختياري)</label>
                <input 
                  type="text" name="dateCreated"
                  value={formData.dateCreated} onChange={handleInputChange}
                  placeholder="مثال: 1345 هـ"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">نوع المرجع</label>
                <select 
                  name="type" value={formData.type} onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {Object.values(ResourceType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">اللغة</label>
                <select 
                  name="language" value={formData.language} onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {Object.values(Language).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">وصف مختصر</label>
              <textarea 
                name="description" rows={4}
                value={formData.description} onChange={handleInputChange}
                placeholder="نبذة عن المرجع أو محتواه..."
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">الكلمات المفتاحية (Tags)</label>
                <input 
                  type="text" name="tags"
                  value={formData.tags} onChange={handleInputChange}
                  placeholder="افصل بينها بفاصلة (مثال: تصوف، مديح)"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">المصدر / المورد</label>
                <input 
                  type="text" name="source"
                  value={formData.source} onChange={handleInputChange}
                  placeholder="مثال: مكتبة الشيخ فلان"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Files & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
            <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">الملف والمصدر</h3>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                file ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-emerald-400'
              }`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload" type="file" className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center">
                <ICONS.Upload />
                <p className="mt-4 font-bold text-stone-700">
                  {file ? file.name : 'اختر ملفاً للرفع'}
                </p>
                <p className="text-xs text-stone-400 mt-2">PDF, DOC, DOCX, TXT أو صور (PNG, JPEG)</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-500">
                <ICONS.GoogleDrive />
              </div>
              <input 
                type="url" name="driveLink"
                value={formData.driveLink} onChange={handleInputChange}
                placeholder="أو ضع رابط Google Drive"
                className="w-full pr-12 pl-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button 
                type="submit" disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  <>
                    <ICONS.Add />
                    <span>حفظ المرجع في المكتبة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-stone-800 p-6 rounded-2xl text-white">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              إرشادات التوثيق
            </h4>
            <ul className="text-xs space-y-3 text-stone-400 leading-relaxed">
              <li>• تأكد من صحة اسم المؤلف وتدقيق العنوان.</li>
              <li>• يفضل إضافة كلمات مفتاحية دقيقة لتسهيل البحث لاحقاً.</li>
              <li>• في حالة المخطوطات، اختر "صور" كنوع ملف.</li>
              <li>• النظام سيقوم تلقائياً باستخراج النص من ملفات Word و TXT.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddResource;
