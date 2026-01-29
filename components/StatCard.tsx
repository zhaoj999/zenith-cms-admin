
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  progress: number;
  trendColor: 'green' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, progress, trendColor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-transform active:scale-[0.98]">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[#657586] dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
        <span className={`text-xs font-bold ${trendColor === 'green' ? 'text-green-600' : 'text-orange-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[#121417] dark:text-white text-2xl font-bold leading-tight font-display">{value}</p>
      <div className="mt-3 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${trendColor === 'green' ? 'bg-primary-accent' : 'bg-orange-500'} rounded-full transition-all duration-700`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
