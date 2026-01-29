
import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import ContentList from './components/ContentList';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'content':
        return <ContentList />;
      case 'assets':
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-6">
              <span className="material-symbols-outlined text-6xl text-primary">folder_open</span>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">资源库</p>
            <p className="text-sm text-gray-500 mt-2">素材管理模块正在全力开发中</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-6">
              <span className="material-symbols-outlined text-6xl text-primary">analytics</span>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">数据统计</p>
            <p className="text-sm text-gray-500 mt-2">深度分析报表即将上线</p>
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-6">
              <span className="material-symbols-outlined text-6xl text-primary">person</span>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">个人中心</p>
            <p className="text-sm text-gray-500 mt-2">账户设置与权限管理模块</p>
          </div>
        );
      default:
        return <Dashboard isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto bg-background-light dark:bg-background-dark pb-20 transition-colors duration-300">
      <main className="flex-1">
        {renderView()}
      </main>
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
