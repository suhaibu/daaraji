
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { ResourceType } from '../types';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', name: ResourceType.POEM, count: 450 },
    { id: '2', name: ResourceType.EXPLANATION, count: 120 },
    { id: '3', name: ResourceType.FIQH, count: 200 },
    { id: '4', name: ResourceType.BIOGRAPHY, count: 85 },
    { id: '5', name: ResourceType.LETTER, count: 40 },
    { id: '6', name: ResourceType.RESEARCH, count: 150 },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newCat: CategoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      count: 0
    };
    setCategories([...categories, newCat]);
    setNewName('');
    setShowAddForm(false);
  };

  const handleStartEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = () => {
    setCategories(categories.map(c => c.id === editingId ? { ...c, name: editName } : c));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا التصنيف؟ سيتم فك ارتباط المراجع المرتبطة به.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">إدارة التصنيفات</h1>
          <p className="text-stone-500">تحكم في هيكلية تصنيف المراجع والمصادر العلمية.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <ICONS.Add />
          إضافة تصنيف جديد
        </button>
      </header>

      {showAddForm && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl animate-scaleIn">
          <h3 className="text-lg font-bold text-amber-900 mb-4 text-center">إضافة تصنيف جديد</h3>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="اسم التصنيف الجديد (مثل: التاريخ، الجغرافيا...)"
              className="flex-1 px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            <button 
              onClick={handleAdd}
              className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-800"
            >
              إضافة
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-stone-500 font-bold"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-stone-100">
          <div className="grid grid-cols-4 bg-stone-50 p-4 text-stone-500 text-xs font-bold uppercase tracking-wider">
            <div className="col-span-2">اسم التصنيف</div>
            <div className="text-center">عدد المراجع</div>
            <div className="text-center">الإجراءات</div>
          </div>
          
          {categories.map((cat) => (
            <div key={cat.id} className="grid grid-cols-4 items-center p-4 hover:bg-stone-50/50 transition-colors">
              <div className="col-span-2">
                {editingId === cat.id ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-1 border border-emerald-500 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      autoFocus
                    />
                    <button onClick={handleSaveEdit} className="text-emerald-600 font-bold text-sm">حفظ</button>
                    <button onClick={() => setEditingId(null)} className="text-stone-400 text-sm">إلغاء</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-bold text-stone-800">{cat.name}</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-600 text-sm font-medium">
                  {cat.count}
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => handleStartEdit(cat)}
                  className="p-2 text-stone-400 hover:text-emerald-600 transition-colors"
                  title="تعديل الاسم"
                >
                  <ICONS.Edit />
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  title="حذف التصنيف"
                >
                  <ICONS.Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-800 p-8 rounded-3xl text-white">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-3 text-amber-400">
          <div className="p-2 bg-amber-400/10 rounded-lg">
            <ICONS.Category />
          </div>
          تنظيم المادة العلمية
        </h4>
        <p className="text-sm text-stone-400 leading-relaxed mb-6">
          إن المكتبة الرقمية تعتمد على التصنيفات كركيزة أساسية لتسهيل وصول المريد والباحث إلى المبتغى. يُنصح بعدم حذف التصنيفات التي تحتوي على عدد كبير من المراجع لتجنب تشتت المادة العلمية.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-stone-700/50 rounded-xl border border-stone-600">
            <h5 className="font-bold mb-2">الدقة الوصفية</h5>
            <p className="text-xs text-stone-500">اختر أسماء تصنيفات واضحة وشاملة للمحتوى.</p>
          </div>
          <div className="p-4 bg-stone-700/50 rounded-xl border border-stone-600">
            <h5 className="font-bold mb-2">التصنيف الهرمي</h5>
            <p className="text-xs text-stone-500">يمكنك مستقبلاً إضافة تصنيفات فرعية لتنظيم أعمق.</p>
          </div>
          <div className="p-4 bg-stone-700/50 rounded-xl border border-stone-600">
            <h5 className="font-bold mb-2">الأرشفة الذكية</h5>
            <p className="text-xs text-stone-500">التصنيفات تساعد محرك الذكاء الاصطناعي على الفهم السياقي.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
