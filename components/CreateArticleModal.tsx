
import React, { useState } from 'react';

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (article: { title: string; author: string; category: string }) => void;
}

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '技术分享'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.author) {
      onSubmit(formData);
      setFormData({ title: '', author: '', category: '技术分享' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 duration-400"
      >
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-bold dark:text-white font-display">发布新文章</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">文章标题</label>
            <input 
              required
              className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 dark:text-white px-4 text-sm font-medium transition-all"
              placeholder="输入引人注目的标题..."
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">作者</label>
              <input 
                required
                className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 dark:text-white px-4 text-sm font-medium transition-all"
                placeholder="署名"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">分类</label>
              <select 
                className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 dark:text-white px-4 text-sm font-medium transition-all appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="技术分享">技术分享</option>
                <option value="设计动态">设计动态</option>
                <option value="市场分析">市场分析</option>
                <option value="产品公告">产品公告</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t dark:border-gray-800">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex-[2] h-12 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              确认发布
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleModal;
