from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date,datetime
from typing import Optional


data = [
    {
        "id": 1,
        "name": "Rahul Sharma",
        "date": "2025-11-06",
        "time": "09:00",
        "duration": 30,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "In-person"
    },
    {
        "id": 2,
        "name": "Anita Verma",
        "date": "2025-11-06",
        "time": "10:00",
        "duration": 45,
        "doctorName": "Dr. Suman Gupta",
        "status": "Pending",
        "mode": "Teleconsultation"
    },
    {
        "id": 3,
        "name": "Vikram Singh",
        "date": "2025-11-07",
        "time": "11:30",
        "duration": 60,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Cancelled",
        "mode": "In-person"
    },
    {
        "id": 4,
        "name": "Pooja Mehta",
        "date": "2025-11-06",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Suman Gupta",
        "status": "Confirmed",
        "mode": "Teleconsultation"
    }
    
   
]

app = FastAPI()

class Appointment_filter(BaseModel):
    datee: Optional[date] = None
    doctorName: Optional[str] = None

    status: Optional[str] = None

class AppointmentStatusUpdate(BaseModel):
    appointment_id: int
    new_status: str

    """
    Query appointments with optional filters.
    
    In a real AWS AppSync + Aurora implementation:
    - This endpoint would map to an AppSync Query resolver
    - The resolver would execute a GraphQL query against Aurora database
    - AppSync would handle authentication, authorization, and request/response mapping
    - Data would be fetched from Amazon Aurora with proper indexing for efficient filtering
    """
@app.post("/appointments")
def get_appointments(filter: Optional[Appointment_filter] = None):
    
    filtered_appointments = data
    today = date.today()

    if filter:
        if filter.datee:
            filtered_appointments = [appt for appt in filtered_appointments if appt["date"] == str(filter.datee)]
        if filter.doctorName:
            filtered_appointments = [appt for appt in filtered_appointments if appt["doctorName"] == filter.doctorName]
        if filter.status:
            filtered_appointments = [appt for appt in filtered_appointments if appt["status"] == filter.status]
    
    # Sort by date proximity (closest to today first), then by time
    def sort_key(appt):
        appt_date = datetime.strptime(appt["date"], "%Y-%m-%d").date()
        days_diff = abs((appt_date - today).days)
        return (days_diff, appt["date"], appt["time"])
    
    filtered_appointments.sort(key=sort_key)
    
    return filtered_appointments


    """
      Update appointment status.
      
      In a production AWS AppSync + Aurora implementation:
      
      1. APPSYNC SUBSCRIPTION TRIGGER:
        - After successful mutation, AppSync would automatically publish the update
          to all subscribed clients via WebSocket connections
        - Real-time dashboard updates would be triggered for:
          * Queue management screens
          * Doctor's appointment dashboard
          * Patient status notifications
        - Subscription topics would be scoped by:
          * Doctor ID for doctor-specific updates
          * Clinic ID for clinic-wide updates
      
      2. AURORA TRANSACTIONAL WRITE:
        - This would perform an Aurora database transaction with ACID guarantees:
          * ATOMICITY: Either all operations succeed or none do
          * CONSISTENCY: Database constraints are maintained
          * ISOLATION: Concurrent updates don't interfere
          * DURABILITY: Changes are permanently saved
        - The transaction would include:
          * Update appointment status in appointments table
          * Log the status change in audit_logs table
          * Update queue_position in queue_management table if needed
          * Send notification to Amazon SNS/SQS for downstream services
      """

@app.patch("/appointments/status")
def update_appointment_status(update: AppointmentStatusUpdate):
    for appointment in data:
        if appointment["id"] == update.appointment_id:
            appointment["status"] = update.new_status
            return {"message": "Status updated successfully", "appointment": appointment}
    
    raise HTTPException(status_code=404, detail="Appointment not found")

