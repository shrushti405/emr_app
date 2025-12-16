# EMR App - Production Flow and GraphQL Overview

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

### Features
- Supports dynamic filters (`date`, `status`, `doctorId`, `search`) for tailored results
- Results sorted by date and time (upcoming appointments first)
- Allows clients to request only necessary fields (optimizes data transfer)
- Single backend endpoint serves multiple frontend roles (admin, doctor, patient)
- Simplifies maintenance through unified API

## Usage of GraphQL and AppSync
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




