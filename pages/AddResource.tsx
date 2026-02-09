
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceType, Language } from '../types';
import { ICONS } from '../constants';

type UploadMode = 'single' | 'bulk';

interface StagedItem {
  id: string;
  name: string;
  type: 'file' | 'link' | 'video';
  file?: File;
  url?: string;
  status: 'ready' | 'uploading' | 'done';
}

const AddResource: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<UploadMode>('single');
  const [loading, setLoading] = useState(false);
  
  // Single Mode State
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
  const [singleFile, setSingleFile] = useState<File | null>(null);

  // Bulk Mode State
  const [stagedItems, setStagedItems] = useState<StagedItem[]>([]);
  const [bulkMetadata, setBulkMetadata] = useState({
    author: '',
    type: ResourceType.POEM,
    language: Language.ARABIC,
  });
  const [bulkLinks, setBulkLinks] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitSingle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('تمت إضافة المرجع بنجاح!');
      navigate('/library');
    }, 1500);
  };

  const handleSubmitBulk = () => {
    if (stagedItems.length === 0) {
      alert('الرجاء إضافة ملفات أو روابط أولاً');
      return;
    }
    setLoading(true);
    // Simulate batch processing
    setTimeout(() => {
      setLoading(false);
      alert(`تمت معالجة وإضافة ${stagedItems.length} مرجع بنجاح!`);
      navigate('/library');
    }, 2500);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Explicitly cast to File[] to fix type error when passing to addFilesToStaging
    const files = Array.from(e.dataTransfer.files) as File[];
    addFilesToStaging(files);
  };

  const addFilesToStaging = (files: File[]) => {
    const newItems: StagedItem[] = files.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      type: 'file',
      file: f,
      status: 'ready'
    }));
    setStagedItems(prev => [...prev, ...newItems]);
  };

  const handleLinksInput = () => {
    const links = bulkLinks.split('\n').filter(l => l.trim() !== '');
    const newItems: StagedItem[] = links.map(l => ({
      id: Math.random().toString(36).substr(2, 9),
      name: l,
      type: l.includes('youtube.com') || l.includes('vimeo.com') ? 'video' : 'link',
      url: l,
      status: 'ready'
    }));
    setStagedItems(prev => [...prev, ...newItems]);
    setBulkLinks('');
  };

  const removeItem = (id: string) => {
    setStagedItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">إضافة مراجع جديدة</h1>
          <p className="text-stone-500">قم بإضافة مرجع فردي بدقة عالية أو استورد مجموعة مراجع دفعة واحدة.</p>
        </div>
        
        <div className="flex bg-stone-200 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setMode('single')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'single' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            إضافة فردية
          </button>
          <button 
            onClick={() => setMode('bulk')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'bulk' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            إضافة جماعية
          </button>
        </div>
      </header>

      {mode === 'single' ? (
        <form onSubmit={handleSubmitSingle} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
              <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">المعلومات الأساسية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-stone-700 mb-2">عنوان المرجع *</label>
                  <input 
                    type="text" required
                    value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="مثال: كتاب تزود الشبان"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">اسم المؤلف *</label>
                  <input 
                    type="text" required
                    value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="اسم المؤلف أو الناظم"
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
                <label className="block text-sm font-bold text-stone-700 mb-2">وصف مختصر</label>
                <textarea 
                  rows={4}
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="نبذة عن المرجع أو محتواه..."
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
              <h3 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-4">الملف والمصدر</h3>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                  singleFile ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-emerald-400'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  ref={fileInputRef} type="file" className="hidden" 
                  onChange={(e) => setSingleFile(e.target.files?.[0] || null)}
                />
                <div className="flex flex-col items-center">
                  <ICONS.Upload />
                  <p className="mt-4 font-bold text-stone-700">
                    {singleFile ? singleFile.name : 'اختر ملفاً للرفع'}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <span>حفظ المرجع</span>}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Bulk Dropzone */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="bg-white border-2 border-dashed border-emerald-200 rounded-3xl p-12 text-center hover:bg-emerald-50/50 transition-colors"
            >
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ICONS.Bulk />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">رفع ملفات متعددة</h3>
              <p className="text-stone-500 mb-8 max-w-md mx-auto">اسحب وأفلت المستندات، الصور، والملفات هنا. سنقوم بتصنيفها تلقائياً.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
              >
                اختر ملفات من جهازك
              </button>
              <input 
                ref={fileInputRef} type="file" multiple className="hidden" 
                onChange={(e) => addFilesToStaging(Array.from(e.target.files || []) as File[])}
              />
            </div>

            {/* Links Input Area */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ICONS.Link />
                </div>
                <h3 className="text-xl font-bold text-stone-800">إضافة روابط وفيديوهات</h3>
              </div>
              <textarea 
                rows={4}
                value={bulkLinks}
                onChange={(e) => setBulkLinks(e.target.value)}
                placeholder="أدخل الروابط هنا (رابط واحد في كل سطر)..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 mb-4 font-mono text-sm"
              />
              <button 
                onClick={handleLinksInput}
                className="bg-stone-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-all text-sm"
              >
                إضافة الروابط للقائمة
              </button>
            </div>

            {/* Staging List */}
            {stagedItems.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                  <h3 className="font-bold text-stone-800">قائمة الانتظار ({stagedItems.length})</h3>
                  <button onClick={() => setStagedItems([])} className="text-red-500 text-sm font-bold hover:underline">مسح الكل</button>
                </div>
                <div className="divide-y divide-stone-50">
                  {stagedItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-stone-50/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          item.type === 'file' ? 'bg-amber-50 text-amber-600' : 
                          item.type === 'video' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {item.type === 'file' ? <ICONS.File /> : <ICONS.Link />}
                        </div>
                        <div>
                          <p className="font-bold text-stone-800 text-sm line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-stone-400 uppercase">{item.type}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                      >
                        <ICONS.Delete />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-900 p-8 rounded-3xl text-white shadow-xl shadow-emerald-900/20">
              <h3 className="text-xl font-bold mb-6 border-b border-emerald-800 pb-4">الإعدادات الجماعية</h3>
              <p className="text-xs text-emerald-300 mb-6 leading-relaxed">هذه البيانات سيتم تطبيقها تلقائياً على جميع العناصر في القائمة لتبسيط عملية الأرشفة.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">المؤلف الافتراضي</label>
                  <input 
                    type="text"
                    value={bulkMetadata.author}
                    onChange={(e) => setBulkMetadata({...bulkMetadata, author: e.target.value})}
                    placeholder="اسم الشيخ أو الباحث"
                    className="w-full bg-emerald-800 border-emerald-700 rounded-xl px-4 py-3 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">تصنيف المجموعة</label>
                  <select 
                    value={bulkMetadata.type}
                    onChange={(e) => setBulkMetadata({...bulkMetadata, type: e.target.value as ResourceType})}
                    className="w-full bg-emerald-800 border-emerald-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  >
                    {Object.values(ResourceType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">اللغة</label>
                  <select 
                    value={bulkMetadata.language}
                    onChange={(e) => setBulkMetadata({...bulkMetadata, language: e.target.value as Language})}
                    className="w-full bg-emerald-800 border-emerald-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  >
                    {Object.values(Language).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-emerald-800">
                <button 
                  onClick={handleSubmitBulk}
                  disabled={loading || stagedItems.length === 0}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-emerald-950 py-4 rounded-xl font-black shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-900"></span>
                  ) : (
                    <>
                      <ICONS.Add />
                      <span>حفظ الكل في المكتبة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-100">
               <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                 نصيحة تقنية
               </h4>
               <p className="text-xs text-stone-500 leading-relaxed">
                 استخدام الرفع الجماعي يوفر 80% من الوقت. الذكاء الاصطناعي سيحاول استخراج العناوين تلقائياً من أسماء الملفات.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResource;
