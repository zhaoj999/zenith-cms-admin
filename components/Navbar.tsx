
import React from 'react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'dashboard', icon: 'home', label: '首页' },
    { id: 'content', icon: 'description', label: '内容' },
    { id: 'assets', icon: 'folder_open', label: '库' },
    { id: 'analytics', icon: 'analytics', label: '分析' },
    { id: 'profile', icon: 'person', label: '我的' }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex justify-around items-center py-2 px-6 z-50 transition-colors shadow-lg">
      {items.map(item => {
        const isActive = currentView === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id as ViewType)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
