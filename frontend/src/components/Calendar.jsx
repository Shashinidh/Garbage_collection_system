import React, { useState } from 'react';
import './Calendar.css';


const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getFirstDayOfMonth = () => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const getTotalDaysInMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return nextMonth.getDate();
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const renderDays = () => {
    const firstDay = getFirstDayOfMonth();
    const totalDays = getTotalDaysInMonth();
    const days = [];

    // Add empty cells for previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty${i}`} className="empty"></div>);
    }

    // Add current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>Prev</button>
        <h2>{monthsOfYear[date.getMonth()]} {date.getFullYear()}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="days">
        {daysOfWeek.map(day => (
          <div key={day} className="day-of-week">{day}</div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
