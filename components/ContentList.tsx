
import React, { useState, useMemo, useEffect } from 'react';
import { Article, ArticleStatus } from '../types';
import ArticleCard from './ArticleCard';
import CreateArticleModal from './CreateArticleModal';
import { articleService } from '../api/services';

const ContentList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesFilter = activeFilter === '全部' || article.status === activeFilter;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, articles]);

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await articleService.delete(id);
        setArticles(articles.filter(a => a.id !== id));
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('删除失败');
      }
    }
  };

  const handleAddArticle = async (newArticle: Omit<Article, 'id' | 'date' | 'status'>) => {
    try {
      const savedArticle = await articleService.create({
        ...newArticle,
        status: ArticleStatus.DRAFT // Default to Draft as per previous logic
      });
      setArticles([savedArticle, ...articles]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create article:', error);
      alert('发布失败');
    }
  };

  const filters = ['全部', '已发布', '草稿', '待审核'];

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-400">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="text-[#131615] dark:text-white flex size-10 -ml-2 shrink-0 items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined">menu</span>
          </div>
          <h2 className="text-[#131615] dark:text-white text-lg font-bold font-display flex-1 px-2">内容库</h2>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-all shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              发布
            </button>
          </div>
        </div>
        <div className="px-4 py-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <p className="text-[#6c7f7c] dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
            管理后台 / 内容库 / 文章
          </p>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="flex w-full h-12 items-stretch rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <div className="text-[#6c7f7c] flex items-center justify-center pl-4">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="flex w-full border-none bg-transparent focus:ring-0 text-[#131615] dark:text-white placeholder:text-[#6c7f7c] px-3 text-sm font-medium"
            placeholder="搜索关键词或作者..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 cursor-pointer shadow-sm transition-all whitespace-nowrap font-bold text-xs ${activeFilter === filter
              ? 'bg-primary text-white scale-105'
              : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#131615] dark:text-gray-300 hover:bg-gray-50'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 flex flex-col gap-4 pb-12">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className="animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <ArticleCard
                article={article}
                onEdit={(id) => console.log('Edit', id)}
                onDelete={handleDelete}
                onPreview={(id) => console.log('Preview', id)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white/50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700">
            <span className="material-symbols-outlined text-5xl mb-3 text-gray-300">article</span>
            <p className="font-bold">暂无相关内容</p>
            <p className="text-xs mt-1">尝试更换搜索关键词或筛选条件</p>
          </div>
        )}
      </div>

      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddArticle}
      />
    </div>
  );
};

export default ContentList;
