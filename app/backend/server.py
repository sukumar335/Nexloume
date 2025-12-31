from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from models import (
    Contact, ContactRequest,
    Application, ApplicationRequest,
    Job, JobRequest,
    Project
)
from email_service import send_contact_email, send_application_email


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ CONTACT ENDPOINTS ============
@api_router.post("/contact")
async def submit_contact(contact_request: ContactRequest):
    """Submit contact form and send email notification"""
    try:
        # Create contact object
        contact = Contact(**contact_request.dict())
        
        # Save to database
        await db.contacts.insert_one(contact.dict())
        
        # Send email notification
        try:
            await send_contact_email(contact.dict())
        except Exception as email_error:
            logger.error(f"Email sending failed but contact saved: {str(email_error)}")
        
        return {
            "status": "success",
            "message": "Contact form submitted successfully! We'll get back to you within 24 hours."
        }
    except Exception as e:
        logger.error(f"Contact submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


# ============ CAREER/APPLICATION ENDPOINTS ============
@api_router.post("/careers/apply")
async def submit_application(app_request: ApplicationRequest):
    """Submit job application and send email notification"""
    try:
        # Create application object
        application = Application(**app_request.dict())
        
        # Save to database
        await db.applications.insert_one(application.dict())
        
        # Send email notification
        try:
            await send_application_email(application.dict())
        except Exception as email_error:
            logger.error(f"Email sending failed but application saved: {str(email_error)}")
        
        return {
            "status": "success",
            "message": "Application submitted successfully! We'll be in touch soon."
        }
    except Exception as e:
        logger.error(f"Application submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit application")


# ============ JOB ENDPOINTS ============
@api_router.get("/jobs", response_model=List[Job])
async def get_jobs():
    """Get all job listings"""
    try:
        jobs = await db.jobs.find({}, {"_id": 0}).to_list(100)
        return jobs
    except Exception as e:
        logger.error(f"Error fetching jobs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch jobs")


@api_router.post("/jobs", response_model=Job)
async def create_job(job_request: JobRequest):
    """Create a new job listing"""
    try:
        job = Job(**job_request.dict())
        await db.jobs.insert_one(job.dict())
        return job
    except Exception as e:
        logger.error(f"Error creating job: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create job")


@api_router.put("/jobs/{job_id}", response_model=Job)
async def update_job(job_id: str, job_request: JobRequest):
    """Update an existing job listing"""
    try:
        from datetime import datetime
        update_data = job_request.dict()
        update_data['updatedAt'] = datetime.utcnow()
        
        result = await db.jobs.update_one(
            {"id": job_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        
        updated_job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
        return Job(**updated_job)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating job: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update job")


@api_router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job listing"""
    try:
        result = await db.jobs.delete_one({"id": job_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        
        return {"status": "success", "message": "Job deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting job: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete job")


# ============ LEGACY ENDPOINTS (for testing) ============
@api_router.get("/")
async def root():
    return {"message": "Nexloume Tech API - Version 1.0"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()