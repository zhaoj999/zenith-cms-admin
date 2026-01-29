import os
from dotenv import load_dotenv

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # Validation to ensure keys are present
    def validate(self):
        if not self.SUPABASE_URL or not self.SUPABASE_KEY:
            print("Warning: SUPABASE_URL or SUPABASE_KEY not found in environment variables.")

settings = Settings()
settings.validate()
