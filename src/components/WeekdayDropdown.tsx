import React, { useEffect, useState } from 'react';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeekdayDropdown: React.FC<{ onSelect: (day: string) => void }> = ({ onSelect }) => {
    const [selectedDay, setSelectedDay] = useState<string>('Monday');

    useEffect(() => {
        onSelect(selectedDay);
    }, [selectedDay, onSelect]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDay(event.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor="weekday" className="block text-sm font-medium text-gray-700">
                Select Weekday
            </label>
            <select
                id="weekday"
                value={selectedDay}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            >
                {weekdays.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default WeekdayDropdown;