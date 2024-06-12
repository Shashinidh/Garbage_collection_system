import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Current month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Current year

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedule');
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, []);

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonthDays = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, index) => index + 1);

  return (
    <div className="calendar bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-center text-3xl font-bold mb-6">Calendar</h2>
      <div className="flex justify-between mb-6">
        <button className="btn" onClick={handlePreviousMonth}>Previous</button>
        <h3 className="text-lg font-bold">{currentMonth}/{currentYear}</h3>
        <button className="btn" onClick={handleNextMonth}>Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="day text-center text-sm font-semibold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {currentMonthDays.map(day => (
          <div key={day} className="day relative flex flex-col items-center p-4 border border-gray-300 rounded-lg">
            <span className="text-lg font-semibold mb-2">{day}</span>
            {/* Render schedule data for each day */}
            {scheduleData.map(schedule => {
              const scheduleDate = new Date(schedule.date).getDate();
              const scheduleMonth = new Date(schedule.date).getMonth() + 1;
              const scheduleYear = new Date(schedule.date).getFullYear();
              if (scheduleDate === day && scheduleMonth === currentMonth && scheduleYear === currentYear) {
                const backgroundColor = schedule.garbage_type === 'recyclable' ? 'bg-green-500' : 'bg-red-500';
                return (
                  <div key={schedule._id} className={`absolute bottom-0 left-0 right-0 p-2 rounded-b-lg ${backgroundColor}`}>
                    {/* Adjust the content according to your needs */}
                    <p className="text-white text-xs">{schedule.garbage_type === 'recyclable' ? 'Recyclable' : 'Non-Recyclable'}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
