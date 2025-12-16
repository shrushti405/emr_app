# EMR App

## Overview
This document explains the production flow of the EMR (Electronic Medical Records) application and the structure of the GraphQL queries used to fetch and update appointment data.

## Production Flow
The overall data flow in production follows this architecture:

**Frontend → AppSync → Lambda → Queue/Database → AppSync → Frontend**

## GraphQL Query Structure for `getAppointments`
The `getAppointments` query retrieves appointment data efficiently with flexible filtering options.

### Example Query
```graphql
query getAppointments($date: String, $status: String, $doctorId: ID, $search: String) {
  getAppointments(date: $date, status: $status, doctorId: $doctorId, search: $search) {
    id
    patientName
    doctor {
      id
      name
    }
    date
    time
    status
  }
}
```
``` python function for this
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
```

### Features
- Supports dynamic filters (`date`, `status`, `doctorId`, `search`) for tailored results
- Results sorted by date and time (upcoming appointments first)
- Allows clients to request only necessary fields (optimizes data transfer)
- Single backend endpoint serves multiple frontend roles (admin, doctor, patient)
- Simplifies maintenance through unified API

## Updation Of Appointment Status
The backend uses GraphQL through AWS AppSync for real-time data synchronization.

### Example Mutation
```graphql
mutation {
  updateAppointment(id: 1, status: "confirmed") {
    id
    status
  }
}
```
```python funtion for this

@app.patch("/appointments/status")
def update_appointment_status(update: AppointmentStatusUpdate):
    for appointment in data:
        if appointment["id"] == update.appointment_id:
            appointment["status"] = update.new_status
            return {"message": "Status updated successfully", "appointment": appointment}
    
    raise HTTPException(status_code=404, detail="Appointment not found")
```

**Real-time Benefits:** This mutation triggers updates pushed by AppSync to all subscribed clients (e.g., doctors), enabling real-time visibility of:
- Appointment status changes
- Patient bookings
- Available time slots

## Frontend Features
- **Calendar View**: Displays appointments sorted by date
- **Filter Management**: Ability to clear filters (e.g., date filter)
- **Appointment Tabs**: Separate views for Upcoming and Past appointments
- **Advanced Filtering**: Filter by status and doctor (individually or combined)
- **Search Functionality**: Search by patient names
- **Status Management**: Update buttons for appointment states (e.g., "Schedule" → "Complete")
- **Conflict Prevention**: Availability checker prevents booking conflicts during scheduling

![Production Flow Architecture](https://github.com/shrushti405/emr_app/blob/main/Screenshot%202025-12-16%20164634.png)
## live link to test features :- https://shrushti405.github.io/EmrApp/<img width="368" height="23" alt="image" src="https://github.com/user-attachments/assets/df76223a-708e-4eb2-9d9a-8e0a1658e14b" />




