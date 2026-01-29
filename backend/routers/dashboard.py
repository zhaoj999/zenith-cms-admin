from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import get_supabase
from ..schemas import DashboardStats, Activity, StatItem
from supabase import Client

router = APIRouter(
    prefix="/api",
    tags=["dashboard"]
)

@router.get("/dashboard/stats", response_model=DashboardStats)
async def get_stats(supabase: Client = Depends(get_supabase)):
    try:
        # Fetch actual counts from DB
        articles_res = supabase.table("articles").select("id", count="exact").execute()
        total_articles = articles_res.count if articles_res.count is not None else 0
        
        pending_res = supabase.table("articles").select("id", count="exact").eq("status", "待审核").execute()
        pending_count = pending_res.count if pending_res.count is not None else 0
        
        # Mock/Static data for views and activeUsers as we don't track them yet
        return {
            "views": {"count": 12345, "trend": "up", "progress": 12},
            "articles": {"count": total_articles, "trend": "up", "progress": 5},
            "pending": {"count": pending_count, "trend": "down", "progress": -2},
            "activeUsers": {"count": 890, "trend": "up", "progress": 8}
        }
    except Exception as e:
        # Fallback for development if DB fails or tables don't exist
        print(f"Error fetching stats: {e}")
        return {
            "views": {"count": 0, "trend": "neutral", "progress": 0},
            "articles": {"count": 0, "trend": "neutral", "progress": 0},
            "pending": {"count": 0, "trend": "neutral", "progress": 0},
            "activeUsers": {"count": 0, "trend": "neutral", "progress": 0}
        }

@router.get("/activities", response_model=List[Activity])
async def get_activities(supabase: Client = Depends(get_supabase)):
    try:
        response = supabase.table("activities").select("*").order("created_at", desc=True).limit(10).execute()
        
        # If no activities, return a mock list or empty
        if not response.data:
             # Use mock data if table empty
             return []
             
        return response.data
    except Exception as e:
        print(f"Error fetching activities: {e}")
        return []
