# API Contracts & Backend Implementation Guide

## Overview
This document outlines the API contracts and implementation plan for Nexloume Tech website backend.

## Mock Data Location
- `/app/frontend/src/mock.js` - Contains all mock data for jobs, projects, services, company info

## Backend Requirements

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Contact form submitted successfully"
}
```

**Backend Actions:**
1. Save contact submission to MongoDB `contacts` collection
2. Send email to `marsugu337@gmail.com` with form details
3. Return success response

**Email Template:**
- Subject: "New Contact Form Submission - {subject}"
- Body: Include all form fields in formatted HTML

---

### 2. Career Application Submission
**Endpoint:** `POST /api/careers/apply`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "position": "string (required)",
  "resume": "string (required, URL)",
  "coverLetter": "string (required)"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Application submitted successfully"
}
```

**Backend Actions:**
1. Save application to MongoDB `applications` collection
2. Send email to `marsugu337@gmail.com` with application details
3. Return success response

**Email Template:**
- Subject: "New Job Application - {position}"
- Body: Include all application fields with resume link

---

### 3. Job Listings Management (Admin)

**Get All Jobs**
**Endpoint:** `GET /api/jobs`

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "location": "string",
    "type": "string",
    "experience": "string",
    "description": "string",
    "createdAt": "datetime"
  }
]
```

**Create Job**
**Endpoint:** `POST /api/jobs`

**Request Body:**
```json
{
  "title": "string (required)",
  "location": "string (required)",
  "type": "string (required)",
  "experience": "string (required)",
  "description": "string (required)"
}
```

**Update Job**
**Endpoint:** `PUT /api/jobs/{id}`

**Delete Job**
**Endpoint:** `DELETE /api/jobs/{id}`

---

### 4. Projects (Read-only for now)
**Endpoint:** `GET /api/projects`

**Response:** Returns all projects from mock data

---

## MongoDB Collections

### contacts
```
{
  "_id": ObjectId,
  "id": string (uuid),
  "name": string,
  "email": string,
  "phone": string,
  "company": string,
  "subject": string,
  "message": string,
  "createdAt": datetime
}
```

### applications
```
{
  "_id": ObjectId,
  "id": string (uuid),
  "name": string,
  "email": string,
  "phone": string,
  "position": string,
  "resume": string (URL),
  "coverLetter": string,
  "createdAt": datetime
}
```

### jobs
```
{
  "_id": ObjectId,
  "id": string (uuid),
  "title": string,
  "location": string,
  "type": string,
  "experience": string,
  "description": string,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

---

## Frontend Integration Changes

### Files to Update:

1. **`/app/frontend/src/pages/Contact.jsx`**
   - Replace mock submission with API call to `/api/contact`
   - Remove mock toast, use API response

2. **`/app/frontend/src/pages/Careers.jsx`**
   - Replace mock submission with API call to `/api/careers/apply`
   - Fetch jobs from `/api/jobs` instead of mock data
   - Remove mock toast, use API response

3. **Create Admin Panel** (Optional for MVP)
   - `/app/frontend/src/pages/Admin.jsx` - Manage job listings
   - Add authentication for admin access

---

## Email Service Configuration

**Service:** Resend
**API Key:** `re_hs9HyrxD_DAcVTiRSCvksCo1Jo8zWaZBj`
**Recipient:** `marsugu337@gmail.com`
**Sender:** `onboarding@resend.dev` (Resend default)

---

## Implementation Order

1. ✅ Setup Resend email integration
2. ✅ Create MongoDB models
3. ✅ Implement contact form endpoint with email
4. ✅ Implement career application endpoint with email
5. ✅ Implement job listings CRUD endpoints
6. ✅ Update frontend to use backend APIs
7. ✅ Test all flows
8. Optional: Admin panel for job management

---

## Testing Checklist

- [ ] Contact form submission saves to DB
- [ ] Contact form sends email to marsugu337@gmail.com
- [ ] Career application submission saves to DB
- [ ] Career application sends email to marsugu337@gmail.com
- [ ] Job listings can be fetched from API
- [ ] Job listings can be created (admin)
- [ ] Job listings can be updated (admin)
- [ ] Job listings can be deleted (admin)
