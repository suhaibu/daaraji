
import React from 'react';
import { Link } from 'react-router-dom';
import { ResourceType, Language } from '../types';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'إجمالي المراجع', value: '1,245', color: 'bg-emerald-600' },
    { label: 'قصائد منظومة', value: '450', color: 'bg-amber-600' },
    { label: 'شروح وفقه', value: '320', color: 'bg-indigo-600' },
    { label: 'مخطوطات مؤرشفة', value: '155', color: 'bg-stone-600' },
  ];

  const recentResources = [
    { id: '1', title: 'مسالك الجنان في جمع ما تفرق من فقه ابن زيدان', author: 'الشيخ الخديم', type: ResourceType.FIQH, date: '2024-10-15' },
    { id: '2', title: 'مواهب النافع في أخبار الشيخ الخديم', author: 'الشيخ محمد محمود', type: ResourceType.BIOGRAPHY, date: '2024-10-12' },
    { id: '3', title: 'قصيدة أسماء الله الحسنى', author: 'الشيخ الخديم', type: ResourceType.POEM, date: '2024-10-08' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">لوحة التحكم</h1>
          <p className="text-stone-500">نظرة عامة على محتويات المكتبة المريدية المركزية.</p>
        </div>
        <Link 
          to="/add" 
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-bold shadow-sm transition-all"
        >
          + إضافة مرجع جديد
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <p className="text-stone-500 text-sm mb-1">{stat.label}</p>
            <div className="flex items-center gap-3">
              <span className={`w-2 h-8 rounded-full ${stat.color}`}></span>
              <h2 className="text-3xl font-black text-stone-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-stone-800">أحدث المراجع المضافة</h3>
            <Link to="/library" className="text-emerald-700 text-sm font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="divide-y divide-stone-50">
            {recentResources.map((res) => (
              <Link key={res.id} to={`/resource/${res.id}`} className="block p-6 hover:bg-stone-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-stone-800 text-lg mb-1">{res.title}</h4>
                    <p className="text-sm text-emerald-600">{res.author}</p>
                  </div>
                  <div className="text-left">
                    <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium mb-1">
                      {res.type}
                    </span>
                    <p className="text-xs text-stone-400">{res.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-6">
          <h3 className="text-xl font-bold text-stone-800 border-b border-stone-100 pb-4">توزيع اللغات</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600">العربية</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600">الولفية (مكتوبة)</span>
                <span className="font-bold">12%</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600" style={{ width: '12%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600">أخرى</span>
                <span className="font-bold">3%</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400" style={{ width: '3%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-stone-100">
             <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
               <h4 className="font-bold text-amber-900 mb-2">تنبيه النظام</h4>
               <p className="text-xs text-amber-800 leading-relaxed">هناك 15 طلباً جديداً لمراجعة وتدقيق بيانات مخطوطات تم رفعها مؤخراً.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
