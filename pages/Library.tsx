
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import { LibraryResource, ResourceType, Language } from '../types';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Dummy data for demonstration
  const mockResources: LibraryResource[] = [
    {
      id: '1',
      title: 'كتاب "تزود الصغار" في العقيدة والعبادة',
      author: 'الشيخ أحمد بمب خادم الرسول',
      type: ResourceType.FIQH,
      language: Language.ARABIC,
      description: 'منظومة تعليمية مبسطة في العقيدة والعبادة والآداب، موجهة للناشئة وطلاب العلم.',
      tags: ['عقيدة', 'عبادة', 'تعليم'],
      source: 'مكتبة طوبى المركزية',
      fileType: 'pdf',
      addedBy: 'أدمن',
      createdAt: '2024-09-20',
    },
    {
      id: '2',
      title: 'قصيدة "جزاكم إلهي" في مدح المصطفى',
      author: 'الشيخ أحمد بمب خادم الرسول',
      type: ResourceType.POEM,
      language: Language.ARABIC,
      description: 'من أروع القصائد المديحية التي نظمها الشيخ الخديم، تعكس عمق المحبة والتعلق بالجناب النبوي.',
      tags: ['مديح', 'تصوف', 'قصائد'],
      source: 'مخطوط أصلي',
      fileType: 'image',
      addedBy: 'أدمن',
      createdAt: '2024-09-25',
    },
    {
      id: '3',
      title: 'تاريخ تأسيس مدينة طوبى المحروسة',
      author: 'باحث في التاريخ المريدي',
      type: ResourceType.RESEARCH,
      language: Language.WOLOF,
      description: 'دراسة وثائقية حول مراحل تأسيس مدينة طوبى والرؤية الروحية التي قامت عليها.',
      tags: ['تاريخ', 'طوبى', 'جغرافيا'],
      source: 'Google Drive',
      fileType: 'drive',
      addedBy: 'محرر 1',
      createdAt: '2024-10-05',
    },
  ];

  const filtered = mockResources.filter(res => {
    const matchesSearch = res.title.includes(searchTerm) || res.author.includes(searchTerm);
    const matchesType = filterType === 'all' || res.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">المكتبة المركزية</h1>
        <p className="text-stone-500">استعرض وابحث في جميع المراجع المريدية الموثقة.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="ابحث عن عنوان، مؤلف، أو موضوع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-48 px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        >
          <option value="all">كل التصنيفات</option>
          {Object.values(ResourceType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map(res => (
            <ResourceCard 
              key={res.id} 
              resource={res} 
              onClick={(id) => navigate(`/resource/${id}`)} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="mb-4 inline-block p-4 rounded-full bg-stone-100">
              <svg className="w-12 h-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-600">لا توجد نتائج مطابقة</h3>
            <p className="text-stone-400">حاول تغيير كلمات البحث أو المرشحات.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
