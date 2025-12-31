from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

# Contact Form Models
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Career Application Models
class ApplicationRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    position: str
    resume: str
    coverLetter: str

class Application(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    position: str
    resume: str
    coverLetter: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Job Models
class JobRequest(BaseModel):
    title: str
    location: str
    type: str
    experience: str
    description: str

class Job(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    location: str
    type: str
    experience: str
    description: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Project Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    problem: str
    solution: str
    impact: str
    image: str
