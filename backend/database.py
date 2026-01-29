from supabase import create_client, Client
from .config import settings

def get_supabase() -> Client:
    """
    Initialize and return the Supabase client.
    """
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    
    if not url or not key:
        raise ValueError("Supabase credentials are missing. Please check your .env file.")
        
    return create_client(url, key)

# Create a singleton instance if needed, or instantiate per request
try:
    supabase: Client = get_supabase()
except Exception as e:
    print(f"Error initializing Supabase client: {e}")
    supabase = None
