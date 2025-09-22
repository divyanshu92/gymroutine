import React, { useState, useMemo } from 'react';

const DatePicker: React.FC<{ onDateChange: (date: string) => void }> = ({ onDateChange }) => {
    const todayString = useMemo(() => new Date().toISOString().split('T')[0], []);
    const [selectedDate, setSelectedDate] = useState<string>(todayString);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        onDateChange(newDate);
    };

    return (
        <div className="flex flex-col items-center">
            <label htmlFor="date-picker" className="mb-2 text-lg font-semibold">Select Date:</label>
            <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                className="border rounded p-2"
                max={todayString}
            />
        </div>
    );
};

export default DatePicker;