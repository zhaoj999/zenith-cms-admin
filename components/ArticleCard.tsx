
import React from 'react';
import { Article, ArticleStatus } from '../types';

interface ArticleCardProps {
  article: Article;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onEdit, onDelete, onPreview }) => {
  const getStatusStyle = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.PUBLISHED:
        return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
      case ArticleStatus.PENDING:
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300';
      case ArticleStatus.DRAFT:
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-[#131615] dark:text-white text-base font-bold leading-tight flex-1 font-display group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${getStatusStyle(article.status)}`}>
            {article.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-y-3 gap-x-6 items-center mt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-[16px] text-primary/60">person</span>
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-[16px] text-primary/60">category</span>
            <span className="font-medium">{article.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-[16px] text-primary/60">event</span>
            <span className="font-medium">{article.date}</span>
          </div>
        </div>
      </div>
      <div className="flex border-t border-gray-50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/50">
        {article.status === ArticleStatus.PENDING ? (
          <button 
            onClick={() => onPreview?.(article.id)}
            className="flex-1 py-3.5 text-primary-light hover:text-primary dark:hover:text-white text-xs font-bold flex items-center justify-center gap-2 border-r border-gray-100 dark:border-gray-700 transition-all hover:bg-white dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            查看预览
          </button>
        ) : null}
        <button 
          onClick={() => onEdit(article.id)}
          className={`flex-1 py-3.5 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-xs font-bold flex items-center justify-center gap-2 ${article.status !== ArticleStatus.PUBLISHED ? '' : 'border-r border-gray-100 dark:border-gray-700'} transition-all hover:bg-white dark:hover:bg-gray-700`}
        >
          <span className="material-symbols-outlined text-[18px]">edit_square</span>
          修改内容
        </button>
        {article.status !== ArticleStatus.PENDING && (
          <button 
            onClick={() => onDelete(article.id)}
            className="flex-1 py-3.5 text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
            移除
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
