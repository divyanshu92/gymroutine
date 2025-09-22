import React, { useState } from 'react';
import { DAILY_ROUTINES } from '../types/workout';

interface DaySelectionProps {
  onDaySelect: (day: keyof typeof DAILY_ROUTINES, date: string) => void;
}

const DaySelection: React.FC<DaySelectionProps> = ({ onDaySelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const days = Object.keys(DAILY_ROUTINES) as (keyof typeof DAILY_ROUTINES)[];

  const getDayFromDate = (dateString: string): keyof typeof DAILY_ROUTINES => {
    const date = new Date(dateString);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];
    return dayName === 'Sunday' ? 'Monday' : dayName as keyof typeof DAILY_ROUTINES;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const workoutDay = getDayFromDate(date);
    onDaySelect(workoutDay, date);
  };

  const handleDaySelect = (day: keyof typeof DAILY_ROUTINES) => {
    onDaySelect(day, selectedDate);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full scroll-container safe-top safe-bottom safe-left safe-right">
        <div className="max-w-sm mx-auto px-4 py-6">
          <h1 className="text-responsive-xl font-bold mb-6 text-center text-gray-800">Gym Routine</h1>
          
          <div className="mb-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <label className="block text-responsive font-semibold mb-3 text-gray-700">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none touch-action-manipulation"
              style={{ fontSize: '16px' }}
            />
            <div className="mt-3 text-sm text-gray-600 text-center">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <div className="space-y-3 pb-8">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className="w-full p-4 bg-blue-500 text-white rounded-2xl font-semibold text-responsive-lg shadow-sm touch-action-manipulation active-scale"
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelection;