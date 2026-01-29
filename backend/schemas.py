from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class ArticleStatus(str, Enum):
    PUBLISHED = '已发布'
    DRAFT = '草稿'
    PENDING = '待审核'

class ArticleBase(BaseModel):
    title: str
    author: str
    category: str
    status: ArticleStatus

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    status: Optional[ArticleStatus] = None

class Article(ArticleBase):
    id: str
    created_at: str  # Maps to 'date' in frontend, or usage of created_at from DB

    class Config:
        from_attributes = True

# Dashboard Stats Schemas
class StatItem(BaseModel):
    count: int
    trend: str
    progress: int

class DashboardStats(BaseModel):
    views: StatItem
    articles: StatItem
    pending: StatItem
    activeUsers: StatItem

# Activity Schemas
class ActivityType(str, Enum):
    ARTICLE = 'article'
    SYSTEM = 'system'
    USER = 'user'

class Activity(BaseModel):
    id: str
    title: str
    type: ActivityType
    statusLabel: Optional[str] = None
    created_at: str # Maps to timeAgo (calculation will be done on frontend or backend)
