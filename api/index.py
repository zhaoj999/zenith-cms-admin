from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
import os

# 导入 Supabase
try:
    from supabase import create_client, Client
    
    # 初始化 Supabase 客户端
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    
    if supabase_url and supabase_key:
        supabase: Client = create_client(supabase_url, supabase_key)
    else:
        supabase = None
except Exception as e:
    print(f"Supabase initialization error: {e}")
    supabase = None

# Pydantic 模型
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

class Article(ArticleBase):
    id: str
    created_at: str

    class Config:
        from_attributes = True

# 创建 FastAPI 应用
app = FastAPI(
    title="Zenith CMS API",
    description="Backend API for Zenith CMS",
    version="1.0.0"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_origins=["*"],  # 开发时允许所有来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 健康检查
@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "supabase_configured": supabase is not None
    }

# 获取所有文章
@app.get("/api/articles/")
async def get_articles():
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        response = supabase.table("articles").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 创建文章
@app.post("/api/articles/")
async def create_article(article: ArticleCreate):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        data = {
            "title": article.title,
            "author": article.author,
            "category": article.category,
            "status": article.status.value
        }
        response = supabase.table("articles").insert(data).execute()
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 更新文章
@app.put("/api/articles/{article_id}")
async def update_article(article_id: str, article: ArticleBase):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        data = {
            "title": article.title,
            "author": article.author,
            "category": article.category,
            "status": article.status.value
        }
        response = supabase.table("articles").update(data).eq("id", article_id).execute()
        return response.data[0] if response.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 删除文章
@app.delete("/api/articles/{article_id}")
async def delete_article(article_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        supabase.table("articles").delete().eq("id", article_id).execute()
        return {"message": "Article deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 获取仪表盘统计
@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # 获取文章统计
        all_articles = supabase.table("articles").select("*").execute()
        total_articles = len(all_articles.data)
        
        pending_articles = [a for a in all_articles.data if a.get("status") == "待审核"]
        pending_count = len(pending_articles)
        
        return {
            "views": {"count": 12453, "trend": "+12.5%", "progress": 75},
            "articles": {"count": total_articles, "trend": "+8.2%", "progress": 60},
            "pending": {"count": pending_count, "trend": "-3.1%", "progress": 45},
            "activeUsers": {"count": 892, "trend": "+15.3%", "progress": 85}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 获取活动记录
@app.get("/api/activities")
async def get_activities():
    # 返回模拟数据
    return [
        {
            "id": "1",
            "title": "新文章发布",
            "type": "article",
            "statusLabel": "已发布",
            "created_at": "2026-01-29T10:30:00Z"
        }
    ]

# Mangum handler for Vercel
handler = Mangum(app, lifespan="off")
