from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import articles, dashboard

app = FastAPI(
    title="Zenith CMS API",
    description="Backend API for Zenith CMS",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://zenith-cms-admin.vercel.app",
    "https://zenith-cms-admin-zhaoj999s-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router)
app.include_router(dashboard.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Zenith CMS API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
