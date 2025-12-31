"""Seed initial job data to MongoDB"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from models import Job
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initial job data
INITIAL_JOBS = [
    {
        "title": "Senior Full Stack Developer",
        "location": "Remote / Trichy",
        "type": "Full-time",
        "experience": "5+ years",
        "description": "We're looking for an experienced full stack developer to join our growing team and lead development projects."
    },
    {
        "title": "UI/UX Designer",
        "location": "Remote / Trichy",
        "type": "Full-time",
        "experience": "3+ years",
        "description": "Join our design team to create beautiful, user-centered designs for cutting-edge applications."
    },
    {
        "title": "DevOps Engineer",
        "location": "Trichy",
        "type": "Full-time",
        "experience": "4+ years",
        "description": "Help us build and maintain robust cloud infrastructure and CI/CD pipelines."
    }
]

async def seed_jobs():
    """Seed initial job data if collection is empty"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Check if jobs already exist
        count = await db.jobs.count_documents({})
        
        if count > 0:
            print(f"Jobs collection already has {count} documents. Skipping seed.")
            return
        
        # Insert initial jobs
        jobs = [Job(**job_data).dict() for job_data in INITIAL_JOBS]
        result = await db.jobs.insert_many(jobs)
        
        print(f"✅ Successfully seeded {len(result.inserted_ids)} jobs")
        
    except Exception as e:
        print(f"❌ Error seeding jobs: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_jobs())
