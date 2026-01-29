
export enum ArticleStatus {
  PUBLISHED = '已发布',
  DRAFT = '草稿',
  PENDING = '待审核'
}

export interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: ArticleStatus;
}

export interface DashboardStats {
  views: { count: number; trend: string; progress: number };
  articles: { count: number; trend: string; progress: number };
  pending: { count: number; trend: string; progress: number };
  activeUsers: { count: number; trend: string; progress: number };
}

export interface Activity {
  id: string;
  title: string;
  type: 'article' | 'system' | 'user';
  statusLabel?: string;
  timeAgo: string;
}

export type ViewType = 'dashboard' | 'content' | 'assets' | 'analytics' | 'profile';
