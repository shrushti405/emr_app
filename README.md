EMR App - Production Flow and GraphQL Overview
Overview

This document explains the production flow of the EMR application and the structure of the GraphQL queries used to fetch and update appointment data.

Production Flow

The overall data flow in production is as follows:

Frontend → AppSync → Lambda → Queue/Database → AppSync → Frontend

GraphQL Query Structure for getAppointments

The getAppointments query is designed to retrieve appointment data efficiently with flexible filtering options.

Example Query
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

Features

Supports dynamic filters such as date, status, doctorId, and search to return tailored results.

Results are sorted by date and time, showing upcoming appointments first.

Allows clients to request only necessary fields, optimizing data transfer.

Single backend endpoint serves different frontend roles (admin, doctor, patient), simplifying maintenance.

Usage of GraphQL and AppSync

The backend uses GraphQL through AppSync for real-time data synchronization.

Example Mutation
mutation {
  updateAppointment(id: 1, status: "confirmed") {
    id
    status
  }
}


This mutation triggers updates pushed by AppSync to all subscribed clients (such as doctors), enabling real-time visibility of appointments, patient bookings, and available slots.

Frontend Features

Calendar view with appointment sorting by date.

Ability to clear filters (e.g., date filter).

Tabs for Upcoming and Past appointments.

Filters by status and doctor (individually or combined).

Search functionality for patient names.

Status update buttons (e.g., Schedule → Complete).

Availability checker to avoid booking conflicts during appointment scheduling.



