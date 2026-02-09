
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../constants';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'الرئيسية', icon: <ICONS.Dashboard />, path: '/' },
    { name: 'المكتبة المركزية', icon: <ICONS.Library />, path: '/library' },
    { name: 'إضافة مرجع', icon: <ICONS.Add />, path: '/add' },
  ];

  return (
    <div className="w-64 h-full bg-emerald-900 text-white flex flex-col fixed top-0 right-0 z-50">
      <div className="p-6 flex items-center justify-center border-b border-emerald-800">
        <h1 className="text-xl font-bold font-serif-ar tracking-wider text-emerald-100">المكتبة المريدية</h1>
      </div>
      
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-6 py-4 transition-colors ${
                isActive ? 'bg-emerald-800 border-l-4 border-amber-400' : 'hover:bg-emerald-800/50'
              }`
            }
          >
            {item.icon}
            <span className="text-lg">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 border-t border-emerald-800 text-sm text-emerald-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
            م
          </div>
          <div>
            <p className="font-bold text-white">مدير المكتبة</p>
            <p className="text-xs">المسؤول الرئيسي</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
