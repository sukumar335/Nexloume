import os
import asyncio
import logging
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL')

logger = logging.getLogger(__name__)

async def send_contact_email(contact_data: dict):
    """Send email notification for contact form submission"""
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #14B8A6 0%, #6366F1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
            .content {{ background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #6366F1; }}
            .value {{ color: #333; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">{contact_data['name']}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">{contact_data['email']}</div>
                </div>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">{contact_data.get('phone', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">{contact_data.get('company', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">{contact_data['subject']}</div>
                </div>
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">{contact_data['message']}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [RECIPIENT_EMAIL],
        "subject": f"New Contact Form Submission - {contact_data['subject']}",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact email sent successfully: {email.get('id')}")
        return {"status": "success", "email_id": email.get('id')}
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        raise

async def send_application_email(application_data: dict):
    """Send email notification for job application submission"""
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #14B8A6 0%, #6366F1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
            .content {{ background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #6366F1; }}
            .value {{ color: #333; }}
            .resume-link {{ display: inline-block; padding: 10px 20px; background: #14B8A6; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Job Application</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Position Applied:</div>
                    <div class="value">{application_data['position']}</div>
                </div>
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">{application_data['name']}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">{application_data['email']}</div>
                </div>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">{application_data['phone']}</div>
                </div>
                <div class="field">
                    <div class="label">Resume:</div>
                    <div class="value"><a href="{application_data['resume']}" class="resume-link" target="_blank">View Resume</a></div>
                </div>
                <div class="field">
                    <div class="label">Cover Letter:</div>
                    <div class="value">{application_data['coverLetter']}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [RECIPIENT_EMAIL],
        "subject": f"New Job Application - {application_data['position']}",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Application email sent successfully: {email.get('id')}")
        return {"status": "success", "email_id": email.get('id')}
    except Exception as e:
        logger.error(f"Failed to send application email: {str(e)}")
        raise
