import React, { useState } from 'react';
import './AppointmentManagement.css';

// ============================================
// TASK 1 INTEGRATION POINT
// ============================================
// In a real implementation, you would import Python functions here:
// import { get_appointments, update_appointment_status } from './python_backend';
//
// For simulation purposes, we're using static data and console logs
// to demonstrate where the Python functions would be called.
// ============================================

// Initial data - in real app this would come from Python get_appointments()

const initialData = [
  {
    "id": 1,
    "name": "Rahul Sharma",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "09:00",
    "duration": 30,
    "doctorName": "Dr. Rajesh Kumar",
    "status": "Scheduled",
    "mode": "In-person"
  },
  {
    "id": 2,
    "name": "Priya Patel",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "09:30",
    "duration": 45,
    "doctorName": "Dr. Riya Sharma",
    "status": "Scheduled",
    "mode": "Online"
  },
  {
    "id": 3,
    "name": "Amit Verma",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "10:30",
    "duration": 30,
    "doctorName": "Dr. Rajesh Kumar",
    "status": "Completed",
    "mode": "In-person"
  },
  {
    "id": 4,
    "name": "Sunita Singh",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "11:00",
    "duration": 60,
    "doctorName": "Dr. Priya Sharma",
    "status": "Completed",
    "mode": "In-person"
  },
  {
    "id": 5,
    "name": "Rajesh Mehta",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "12:00",
    "duration": 30,
    "doctorName": "Dr. Rajesh Kumar",
    "status": "Completed",
    "mode": "Online"
  },
  {
    "id": 6,
    "name": "Neha Gupta",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "14:00",
    "duration": 45,
    "doctorName": "Dr. Riya Sharma",
    "status": "Confirmed",
    "mode": "In-person"
  },
  {
    "id": 7,
    "name": "Vikram Joshi",
    "date": "2025-12-16", // TODAY - In UTC
    "time": "15:00",
    "duration": 30,
    "doctorName": "Dr. Priya Sharma",
    "status": "Cancelled",
    "mode": "Online"
  },
  {
    "id": 8,
    "name": "Anjali Desai",
    "date": "2025-12-14", // TODAY - In UTC
    "time": "16:00",
    "duration": 60,
    "doctorName": "Dr. Rajesh Kumar",
    "status": "Confirmed",
    "mode": "In-person"
  },
  {
    "id": 9,
    "name": "Sanjay Kumar",
    "date": "2025-12-15", // YESTERDAY - In UTC (Past)
    "time": "10:00",
    "duration": 30,
    "doctorName": "Dr. Riya Sharma",
    "status": "Completed",
    "mode": "In-person"
  },
  {
    "id": 10,
    "name": "Meera Nair",
    "date": "2025-12-17", // TOMORROW - In UTC (Upcoming)
    "time": "11:30",
    "duration": 45,
    "doctorName": "Dr. Priya Sharma",
    "status": "Scheduled",
    "mode": "Online"
  },
  {
    "id": 11,
    "name": "Karan Malhotra",
    "date": "2025-12-18", // DAY AFTER TOMORROW - In UTC (Upcoming)
    "time": "09:00",
    "duration": 30,
    "doctorName": "Dr. Rajesh Kumar",
    "status": "Confirmed",
    "mode": "In-person"
  },
  {
    "id": 12,
    "name": "Pooja Reddy",
    "date": "2025-12-19", // FUTURE - In UTC (Upcoming)
    "time": "17:00",
    "duration": 30,
    "doctorName": "Dr. Riya Sharma",
    "status": "Scheduled",
    "mode": "Online"
  }
];

function GetAppointments() {
  const [appointments, setAppointments] = useState(initialData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [timeFilter, setTimeFilter] = useState("All");

  
  

  const uniqueDoctors = ["All Doctors", ...new Set(appointments.map(item => item.doctorName))];
  const statusOptions = ["All Status", "Confirmed", "Scheduled", "Upcoming", "Cancelled","Completed"];

  // ============================================
  // TASK 2: Calendar Filtering Integration Point
  // ============================================
  // In a real implementation, this would call Python get_appointments() with date filter
  const handleDateClick = (dateString) => {
    if (selectedDate === dateString) {
      setSelectedDate(null);
      // TASK 2 INTEGRATION: Would call get_appointments() without filter
      console.log('[TASK 2] Would call: get_appointments() to fetch all appointments');
      // const data = await get_appointments();
      // setAppointments(data);
    } else {
      setSelectedDate(dateString);
      // TASK 2 INTEGRATION: Would call get_appointments(dateString) with date filter
      console.log(`[TASK 2] Would call: get_appointments("${dateString}") with date filter`);
      // const data = await get_appointments(dateString);
      // setAppointments(data);
    }
  };

  // Navigation for months
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleToday = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setCurrentMonth(new Date());
    setSelectedDate(todayStr);
  };

  // ============================================
  // TASK 4: Status Update Integration Point
  // ============================================
  // In a real implementation, this would call Python update_appointment_status()
  // and then refresh data with get_appointments()
  const updateAppointmentStatus = (id, newStatus) => {
    console.log(`[TASK 4] Would call: update_appointment_status(${id}, "${newStatus}")`);
    console.log(`[TASK 4] Would then call: get_appointments(${selectedDate || 'null'}) to refresh data`);
    
    // Local state update for UI demonstration
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === id) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    
    // Show alert to user
    const appointment = appointments.find(a => a.id === id);
    alert(`[TASK 4 Simulation]\nAppointment for ${appointment.name} updated to: ${newStatus}\n\nPython functions called:\n1. update_appointment_status(${id}, "${newStatus}")\n2. get_appointments(${selectedDate || 'No date filter'})`);
  };

  // ============================================
  // TASK 3: Tab Filtering Logic
  // ============================================
  const filteredData = appointments.filter(appointment => {
    // Filter by date if selected
    if (selectedDate && appointment.date !== selectedDate) return false;
    
    // Filter by search query
    if (searchQuery && !appointment.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== "All Status" && appointment.status !== selectedStatus) return false;
    
    // Filter by doctor
    if (selectedDoctor !== "All Doctors" && appointment.doctorName !== selectedDoctor) return false;
    
    // TASK 3: Tab Filtering - filter by date relative to today
    if (timeFilter !== "All") {
      const today = new Date().toISOString().split('T')[0];
      
      if (timeFilter === "Today") {
        if (appointment.date !== today) return false;
      } 
      else if (timeFilter === "Upcoming") {
        if (appointment.date <= today) return false;
      } 
      else if (timeFilter === "Past") {
        if (appointment.date >= today) return false;
      }
    }
    
    return true;
  });

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return '#10b981';
      case 'Scheduled': return '#3b82f6';
      case 'Upcoming': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      case 'Completed': return '#8b5cf6';
      default: return '#c17eeaff';
    }
  };

  const Calendar = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Previous month days
    const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ 
        day: prevMonthLastDay - i, 
        currentMonth: false,
        dateString: null
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ 
        day: i, 
        currentMonth: true,
        dateString: dateStr,
        hasAppointments: appointments.some(a => a.date === dateStr),
        isSelected: selectedDate === dateStr
      });
    }
    
    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ 
        day: i, 
        currentMonth: false,
        dateString: null
      });
    }
    
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    return (
      <div className="calendar-section">
        <h2>Calendar</h2>
        <div className="calendar-header">
          <div className="calendar-nav">
            <button className="nav-button" onClick={handlePrevMonth}>&lt;</button>
            <h3>{monthYear}</h3>
            <button className="nav-button" onClick={handleNextMonth}>&gt;</button>
          </div>
          <button className="today-button" onClick={handleToday}>Today</button>
          
          <div className="weekdays">
            {weekdays.map(day => (
              <span key={day} className="weekday">{day}</span>
            ))}
          </div>
          <div className="days-grid">
            {days.map((dayObj, index) => (
              <div
                key={index}
                className={`day-cell ${dayObj.currentMonth ? 'current-month' : 'other-month'} 
                           ${dayObj.isSelected ? 'selected' : ''}
                           ${dayObj.hasAppointments ? 'has-appointments' : ''}`}
                onClick={() => dayObj.currentMonth && dayObj.dateString && handleDateClick(dayObj.dateString)}
              >
                {dayObj.day}
                {dayObj.hasAppointments && <div className="appointment-dot"></div>}
                {dayObj.isSelected && <div className="selected-indicator">✓</div>}
              </div>
            ))}
          </div>
        </div>
        
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color confirmed"></div>
            <span>Confirmed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color scheduled"></div>
            <span>Scheduled</span>
          </div>
          <div className="legend-item">
            <div className="legend-color completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color cancelled"></div>
            <span>Cancelled</span>
          </div>
        </div>
        
        {selectedDate && (
          <div className="selected-date-info">
            Selected Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            <button 
              className="clear-selection" 
              onClick={() => setSelectedDate(null)}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    );
  };
    // ============================================
  // AVAILABILITY CHECKER WITH FILTERS
  // ============================================
  const [checkDate, setCheckDate] = useState('');
  const [checkTime, setCheckTime] = useState('');
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [checkDoctor, setCheckDoctor] = useState('All Doctors');
  const [checkStatus, setCheckStatus] = useState('All Status');

  const checkAvailability = () => {
    if (!checkDate || !checkTime) {
      alert('Please select both date and time');
      return;
    }

    // Convert to 24-hour format
    const time24 = checkTime.includes(' ') 
      ? (() => {
          const [time, mod] = checkTime.split(' ');
          let [h, m] = time.split(':');
          if (mod === 'PM' && h !== '12') h = String(parseInt(h) + 12);
          if (mod === 'AM' && h === '12') h = '00';
          return `${h.padStart(2, '0')}:${m}`;
        })()
      : checkTime;

    // Find conflicts with filters
    const conflicts = appointments.filter(app => {
      // Date filter
      if (app.date !== checkDate) return false;
      
      // Doctor filter
      if (checkDoctor !== 'All Doctors' && app.doctorName !== checkDoctor) return false;
      
      // Status filter
      if (checkStatus !== 'All Status' && app.status !== checkStatus) return false;
      
      // Time overlap check
      const start = app.time;
      const [sh, sm] = start.split(':').map(Number);
      const endMinutes = sh * 60 + sm + app.duration;
      const end = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;
      
      const check = parseInt(time24.split(':')[0]) * 60 + parseInt(time24.split(':')[1]);
      const appStart = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
      const appEnd = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
      
      return check >= appStart && check < appEnd;
    });

    // Calculate filtered appointments count
    const filteredApps = appointments.filter(app => {
      if (app.date !== checkDate) return false;
      if (checkDoctor !== 'All Doctors' && app.doctorName !== checkDoctor) return false;
      if (checkStatus !== 'All Status' && app.status !== checkStatus) return false;
      return true;
    });

    setAvailabilityResult({
      available: conflicts.length === 0,
      message: conflicts.length === 0 
        ? `✅ ${checkTime} on ${checkDate} is AVAILABLE`
        : `❌ ${checkTime} on ${checkDate} is NOT AVAILABLE`,
      conflicts,
      filteredCount: filteredApps.length,
      doctor: checkDoctor,
      status: checkStatus
    });
  };

  const quickCheckToday = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const hour = today.getHours().toString().padStart(2, '0');
    const minute = today.getMinutes().toString().padStart(2, '0');
    
    setCheckDate(todayStr);
    setCheckTime(`${hour}:${minute}`);
    setTimeout(() => checkAvailability(), 100);
  };


  return (
    <div className="appointment-management">
      {/* Header matching the mockup */}
      <div className="header-section">
        <h1>Appointment Management</h1>
        <p className="subtitle">Schedule and manage patient appointments</p>
        
        <div className="header-stats">
          <div className="stat-card">
            <h3>Today's Appointments</h3>
            <p className="stat-number">{appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmed Appointments</h3>
            <p className="stat-number">{appointments.filter(a => a.status === 'Confirmed').length}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming</h3>
            <p className="stat-number">{appointments.filter(a => new Date(a.date) > new Date()).length}</p>
          </div>
          <div className="stat-card">
            <h3>Telemedicine Sessions</h3>
            <p className="stat-number">{appointments.filter(a => a.mode === 'Online').length}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard">
        <div className="left-panel">
  {Calendar()}
  
  {/* AVAILABILITY CHECKER WITH FILTERS */}
  <div className="availability-simple">
    <h3>Check Time Slot Availability</h3>
    
    <div className="availability-inputs">
      <input
        type="date"
        value={checkDate}
        onChange={(e) => setCheckDate(e.target.value)}
        placeholder="Select date"
      />
      <input
        type="time"
        value={checkTime}
        onChange={(e) => setCheckTime(e.target.value)}
        placeholder="Select time"
      />
      <button className="check-btn" onClick={checkAvailability}>
        Check
      </button>
    </div>
    
    <div className="filter-controls availability-filters">
      <div className="filter-group">
        <label>Filter by Doctor:</label>
        <select 
          value={checkDoctor}
          onChange={(e) => setCheckDoctor(e.target.value)}
          className="filter-select"
        >
          <option value="All Doctors">All Doctors</option>
          {uniqueDoctors.filter(d => d !== 'All Doctors').map((doctor, idx) => (
            <option key={idx} value={doctor}>{doctor}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Filter by Status:</label>
        <select 
          value={checkStatus}
          onChange={(e) => setCheckStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All Status">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      
      <button className="quick-btn" onClick={quickCheckToday}>
        Check Today Now
      </button>
    </div>
    
    {availabilityResult && (
      <div className={`result-box ${availabilityResult.available ? 'available' : 'unavailable'}`}>
        <div className="result-header">
          <p>{availabilityResult.message}</p>
          <div className="result-filters">
            <span className="filter-tag">Doctor: {availabilityResult.doctor}</span>
            <span className="filter-tag">Status: {availabilityResult.status}</span>
            <span className="filter-tag">Appointments: {availabilityResult.filteredCount}</span>
          </div>
        </div>
        
        {availabilityResult.conflicts.length > 0 && (
          <div className="conflicts">
            <p><strong>Conflicts found:</strong></p>
            {availabilityResult.conflicts.map((conflict, idx) => (
              <div key={idx} className="conflict-item">
                <div className="conflict-info">
                  <strong>{conflict.name}</strong> 
                  <span>({formatTime(conflict.time)} - {conflict.duration}min)</span>
                </div>
                <div className="conflict-details">
                  {conflict.doctorName} • {conflict.status} • {conflict.mode}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {availabilityResult.available && availabilityResult.filteredCount > 0 && (
          <div className="available-info">
            <p>✓ No conflicts found with current filters</p>
            <p className="hint">There are {availabilityResult.filteredCount} appointments matching your filters on this date.</p>
          </div>
        )}
      </div>
    )}
  </div>
</div>
         
        <div className="right-panel">
          <div className="confirmed-section">
            <h2>Confirmed</h2>
            <p className="section-subtitle">Confirmed Appointments</p>
            
            {/* TASK 3: Tab Filtering UI */}
            <div className="filter-tabs">
              {['Upcoming', 'Today', 'Past', 'All'].map(tab => (
                <button
                  key={tab}
                  className={`tab ${timeFilter === tab ? 'active' : ''}`}
                  onClick={() => setTimeFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="filter-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="dropdowns">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-dropdown"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="doctor-dropdown"
                >
                  {uniqueDoctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="appointments-list">
              {filteredData.length === 0 ? (
                <div className="no-appointments">
                  No appointments found
                  {selectedDate && (
                    <p className="hint">
                      Try clearing the date filter or selecting a different date
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="appointments-count">
                    Showing {filteredData.length} appointment{filteredData.length !== 1 ? 's' : ''}
                    {selectedDate && ` for ${new Date(selectedDate).toLocaleDateString()}`}
                    {timeFilter !== 'All' && ` (${timeFilter} filter)`}
                  </div>
                  {filteredData.map(appointment => (
                    <div key={appointment.id} className="appointment-card">
                      <div className="appointment-header">
                        <h3 className="patient-name">{appointment.name}</h3>
                        <div className="appointment-time">
                          {formatTime(appointment.time)} · {appointment.duration} min
                        </div>
                      </div>
                      
                      <div className="appointment-details">
                        <div className="doctor-info">
                          {appointment.doctorName} · {appointment.mode}
                        </div>
                        
                        <div className="appointment-type">
                          <span className="type-badge">
                            {appointment.mode === 'Online' ? 'Telemedicine' : 'Consultation'}
                          </span>
                          <span className="status-badge" style={{ backgroundColor: getStatusColor(appointment.status) }}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <div className="reason">
                          Reason: {appointment.name}'s {appointment.mode === 'Online' ? 'Telemedicine' : 'In-person'} Appointment
                        </div>
                        
                        <div className="contact-info">
                          <span className="phone">+91 98765 43210</span>
                          <span className="email">{appointment.name.toLowerCase().replace(' ', '.')}@email.com</span>
                        </div>

                        {/* TASK 4: Status Update Buttons */}
                        <div className="appointment-actions">
                          <button 
                            className="status-btn complete-btn"
                            onClick={() => updateAppointmentStatus(appointment.id, 'Completed')}
                            disabled={appointment.status === 'Completed' || appointment.status === 'Cancelled'}
                          >
                            Mark Completed
                          </button>
                          <button 
                            className="status-btn cancel-btn"
                            onClick={() => updateAppointmentStatus(appointment.id, 'Cancelled')}
                            disabled={appointment.status === 'Cancelled'}
                          >
                            Cancel
                          </button>
                          <button 
                            className="status-btn reschedule-btn"
                            onClick={() => updateAppointmentStatus(appointment.id, 'Scheduled')}
                          >
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAppointments;

// Set-ExecutionPolicy Unrestricted -Scope Process
