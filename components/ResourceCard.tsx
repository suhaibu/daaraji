
import React from 'react';
import { LibraryResource } from '../types';
import { ICONS } from '../constants';

interface ResourceCardProps {
  resource: LibraryResource;
  onClick: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'word': return 'bg-blue-100 text-blue-700';
      case 'image': return 'bg-emerald-100 text-emerald-700';
      case 'drive': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={() => onClick(resource.id)}
      className="bg-white border border-stone-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getFileTypeColor(resource.fileType)} uppercase`}>
          {resource.fileType}
        </span>
        <span className="text-xs text-stone-400">
          {new Date(resource.createdAt).toLocaleDateString('ar-EG')}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
        {resource.title}
      </h3>
      <p className="text-emerald-600 text-sm font-medium mb-3">{resource.author}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px]">{resource.type}</span>
        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px]">{resource.language}</span>
      </div>
      
      <p className="text-stone-500 text-xs line-clamp-3 mb-4 leading-relaxed">
        {resource.description}
      </p>
      
      <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-stone-400">
        <div className="flex items-center gap-1 text-[11px]">
          <ICONS.File />
          <span>{resource.source}</span>
        </div>
        <button className="text-emerald-600 hover:text-emerald-800 text-xs font-bold">
          تفاصيل &larr;
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
