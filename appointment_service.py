from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date,datetime
from typing import Optional


mock_appointments = [
    {
        "id": 1,
        "name": "Aarav Sharma",
        "date": "2025-11-05",
        "time": "09:00",
        "duration": 45,
        "doctorName": "Dr. Anil Verma",
        "status": "Confirmed",
        "mode": "In-person",
        "department": "Cardiology",
        "patient_age": 58,
        "contact": "9876543210"
    },
    {
        "id": 2,
        "name": "Priya Patel",
        "date": "2025-11-06",
        "time": "10:30",
        "duration": 30,
        "doctorName": "Dr. Suman Gupta",
        "status": "Scheduled",
        "mode": "Teleconsultation",
        "department": "Gynecology",
        "patient_age": 32,
        "contact": "8765432109"
    },
    {
        "id": 3,
        "name": "Vikram Singh",
        "date": "2025-11-07",
        "time": "11:30",
        "duration": 60,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Cancelled",
        "mode": "In-person",
        "department": "Orthopedics",
        "patient_age": 45,
        "contact": "7654321098"
    },
    {
        "id": 4,
        "name": "Pooja Mehta",
        "date": "2025-11-06",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Suman Gupta",
        "status": "Confirmed",
        "mode": "Teleconsultation",
        "department": "Gynecology",
        "patient_age": 28,
        "contact": "6543210987"
    },
    {
        "id": 5,
        "name": "Rohan Desai",
        "date": "2025-11-08",
        "time": "15:45",
        "duration": 20,
        "doctorName": "Dr. Anil Verma",
        "status": "Scheduled",
        "mode": "In-person",
        "department": "Cardiology",
        "patient_age": 62,
        "contact": "5432109876"
    },
    {
        "id": 6,
        "name": "Sneha Reddy",
        "date": "2025-11-05",
        "time": "16:30",
        "duration": 40,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Completed",
        "mode": "In-person",
        "department": "Orthopedics",
        "patient_age": 38,
        "contact": "4321098765"
    },
    {
        "id": 7,
        "name": "Karan Malhotra",
        "date": "2025-11-09",
        "time": "08:15",
        "duration": 25,
        "doctorName": "Dr. Neha Singh",
        "status": "Confirmed",
        "mode": "Teleconsultation",
        "department": "Dermatology",
        "patient_age": 29,
        "contact": "3210987654"
    },
    {
        "id": 8,
        "name": "Anjali Joshi",
        "date": "2025-11-07",
        "time": "13:20",
        "duration": 50,
        "doctorName": "Dr. Suman Gupta",
        "status": "No-Show",
        "mode": "In-person",
        "department": "Gynecology",
        "patient_age": 41,
        "contact": "2109876543"
    },
    {
        "id": 9,
        "name": "Rahul Bose",
        "date": "2025-11-10",
        "time": "10:00",
        "duration": 35,
        "doctorName": "Dr. Anil Verma",
        "status": "Scheduled",
        "mode": "In-person",
        "department": "Cardiology",
        "patient_age": 55,
        "contact": "1098765432"
    },
    {
        "id": 10,
        "name": "Meera Iyer",
        "date": "2025-11-06",
        "time": "11:45",
        "duration": 30,
        "doctorName": "Dr. Neha Singh",
        "status": "Completed",
        "mode": "Teleconsultation",
        "department": "Dermatology",
        "patient_age": 26,
        "contact": "0987654321"
    },
    {
        "id": 11,
        "name": "Arjun Kapoor",
        "date": "2025-11-08",
        "time": "14:30",
        "duration": 45,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "In-person",
        "department": "Orthopedics",
        "patient_age": 50,
        "contact": "9876512345"
    },
    {
        "id": 12,
        "name": "Divya Nair",
        "date": "2025-11-09",
        "time": "09:45",
        "duration": 60,
        "doctorName": "Dr. Suman Gupta",
        "status": "Scheduled",
        "mode": "In-person",
        "department": "Gynecology",
        "patient_age": 34,
        "contact": "8765423456"
    },
    {
        "id": 13,
        "name": "Sanjay Rao",
        "date": "2025-11-07",
        "time": "12:15",
        "duration": 20,
        "doctorName": "Dr. Anil Verma",
        "status": "Cancelled",
        "mode": "Teleconsultation",
        "department": "Cardiology",
        "patient_age": 67,
        "contact": "7654334567"
    },
    {
        "id": 14,
        "name": "Kavita Shah",
        "date": "2025-11-10",
        "time": "15:00",
        "duration": 30,
        "doctorName": "Dr. Neha Singh",
        "status": "Confirmed",
        "mode": "In-person",
        "department": "Dermatology",
        "patient_age": 31,
        "contact": "6543245678"
    },
    {
        "id": 15,
        "name": "Manoj Tiwari",
        "date": "2025-11-05",
        "time": "17:30",
        "duration": 40,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "No-Show",
        "mode": "In-person",
        "department": "Orthopedics",
        "patient_age": 52,
        "contact": "5432156789"
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


