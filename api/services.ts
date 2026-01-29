import { request } from './client';
import { Article, DashboardStats, Activity } from '../types';

export const articleService = {
    getAll: () => request<Article[]>('/articles/'),

    create: (article: Omit<Article, 'id' | 'date'> & { status: string }) =>
        request<Article>('/articles/', {
            method: 'POST',
            body: JSON.stringify(article),
        }),

    update: (id: string, data: Partial<Article>) =>
        request<Article>(`/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        request<{ message: string }>(`/articles/${id}`, {
            method: 'DELETE',
        }),
};

export const dashboardService = {
    getStats: () => request<DashboardStats>('/dashboard/stats'),
    getActivities: () => request<Activity[]>('/activities'),
};
