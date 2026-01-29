from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import get_supabase
from ..schemas import Article, ArticleCreate, ArticleUpdate
from supabase import Client

router = APIRouter(
    prefix="/api/articles",
    tags=["articles"]
)

@router.get("/", response_model=List[Article])
async def get_articles(supabase: Client = Depends(get_supabase)):
    try:
        response = supabase.table("articles").select("*").order("created_at", desc=True).execute()
        # Map created_at to date for frontend compatibility if needed, 
        # but usage of Pydantic model with from_attributes should handle it if names match.
        # Frontend expects 'date', backend has 'created_at'.
        # We need to construct the response to match the schema.
        # Schema Article has 'created_at'. 
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Article)
async def create_article(article: ArticleCreate, supabase: Client = Depends(get_supabase)):
    try:
        data = article.model_dump()
        # Ensure status is string
        data['status'] = data['status'].value
        response = supabase.table("articles").insert(data).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{article_id}", response_model=Article)
async def update_article(article_id: str, article: ArticleUpdate, supabase: Client = Depends(get_supabase)):
    try:
        data = article.model_dump(exclude_unset=True)
        if data.get('status'):
            data['status'] = data['status'].value
            
        response = supabase.table("articles").update(data).eq("id", article_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Article not found")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{article_id}")
async def delete_article(article_id: str, supabase: Client = Depends(get_supabase)):
    try:
        response = supabase.table("articles").delete().eq("id", article_id).execute()
        # Supabase delete API structure might vary, but usually returns the deleted row.
        # We just return success status.
        return {"message": "Article deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
