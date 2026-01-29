from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import sys
import os

# 添加项目根目录到 Python 路径
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# 导入后端模块
from backend.routers import articles, dashboard

app = FastAPI(
    title="Zenith CMS API",
    description="Backend API for Zenith CMS",
    version="1.0.0"
)

# CORS 配置 - 允许 Vercel 部署
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://*.vercel.app",  # 允许所有 Vercel 部署
]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",  # 使用正则匹配 Vercel 域名
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 健康检查端点
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

# 注册路由
app.include_router(articles.router, prefix="/api/articles", tags=["articles"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

# Mangum handler for Vercel Serverless
handler = Mangum(app, lifespan="off")
