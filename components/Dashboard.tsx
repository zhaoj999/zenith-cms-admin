
import React, { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import StatCard from './StatCard';
import { Activity, DashboardStats } from '../types';
import { dashboardService } from '../api/services';

interface DashboardProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, activitiesData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getActivities()
        ]);
        setStats(statsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => [
    { name: '周一', value: 35 },
    { name: '周二', value: 65 },
    { name: '周三', value: 85 },
    { name: '周四', value: 55 },
    { name: '周五', value: 75 },
    { name: '周六', value: 95 },
    { name: '周日', value: 60 },
  ], []);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[#121417] dark:text-white">menu</span>
          </button>
          <h2 className="text-[#121417] dark:text-white text-lg font-bold font-display">控制面板</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/10 ring-2 ring-primary/5">
            <img alt="Profile" className="w-full h-full object-cover" src="https://picsum.photos/seed/user123/100/100" />
          </div>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-6">
        {/* Search */}
        <div className="w-full">
          <div className="flex w-full items-stretch rounded-2xl h-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
            <div className="text-[#657586] flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full flex-1 border-none bg-transparent focus:ring-0 text-[#121417] dark:text-white placeholder:text-[#657586] px-4 text-sm font-normal"
              placeholder="搜索内容、用户或设置..."
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="今日浏览量"
            value={stats?.views.count.toLocaleString() || '-'}
            trend={stats?.views.trend || ''}
            progress={stats?.views.progress || 0}
            trendColor={stats?.views.trend.startsWith('-') ? 'red' : 'green'}
          />
          <StatCard
            label="新增文章"
            value={stats?.articles.count.toLocaleString() || '-'}
            trend={stats?.articles.trend || ''}
            progress={stats?.articles.progress || 0}
            trendColor={stats?.articles.trend.startsWith('-') ? 'red' : 'green'}
          />
          <StatCard
            label="待审核"
            value={stats?.pending.count.toLocaleString() || '-'}
            trend={stats?.pending.trend || ''}
            progress={stats?.pending.progress || 0}
            trendColor={stats?.pending.trend.startsWith('-') ? 'red' : 'green'}
          />
          <StatCard
            label="活跃用户"
            value={stats?.activeUsers.count.toLocaleString() || '-'}
            trend={stats?.activeUsers.trend || ''}
            progress={stats?.activeUsers.progress || 0}
            trendColor={stats?.activeUsers.trend.startsWith('-') ? 'red' : 'green'}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700">
            <div className="flex flex-col">
              <h3 className="text-[#121417] dark:text-white font-bold text-sm">内容访问趋势</h3>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">本周数据统计</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400">
              <span className="material-symbols-outlined text-sm">more_horiz</span>
            </button>
          </div>
          <div className="p-4 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#657586', fontWeight: 500 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(57, 224, 121, 0.05)' }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#111827'
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 5 ? '#39E079' : isDarkMode ? '#39E07922' : '#39E07933'}
                      className="transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[#121417] dark:text-white font-bold text-base">最近动态</h3>
            <button className="text-primary-accent text-xs font-bold hover:underline transition-all">查看全部</button>
          </div>
          <div className="flex flex-col gap-3 pb-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-primary-light dark:hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                <div className={`size-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${act.type === 'article' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  act.type === 'system' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                  <span className="material-symbols-outlined text-xl">
                    {act.type === 'article' ? 'article' : act.type === 'system' ? 'settings_applications' : 'person_add'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#121417] dark:text-white truncate group-hover:text-primary transition-colors">{act.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${act.type === 'article' ? 'bg-green-50 text-green-700 dark:bg-green-900/20' :
                      act.type === 'system' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20' :
                        'bg-purple-50 text-purple-700 dark:bg-purple-900/20'
                      }`}>
                      {act.statusLabel}
                    </span>
                    <span className="text-[10px] text-[#657586] dark:text-gray-400 font-medium">{act.timeAgo}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
