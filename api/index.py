from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

# 创建最简化的 FastAPI 应用
app = FastAPI(title="Zenith CMS API")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 基础健康检查
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Basic test working"}

# 测试端点
@app.get("/api/test")
def test():
    return {"test": "success"}

# Mangum handler
handler = Mangum(app, lifespan="off")
