import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles

interface BookingCalendarProps {
  onDateSelect: (date: Date | null) => void; // Accept Date or null
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect }) => {
  const [date, setDate] = useState<Date | null>(null); // State can be Date or null

  // Handle date change
  const handleDateChange = (selectedDate: unknown) => {
    if (Array.isArray(selectedDate)) {
      // Handle multiple dates or date ranges
      if (selectedDate.length === 2 && selectedDate.every(d => d instanceof Date)) {
        const startDate = selectedDate[0];
        const endDate = selectedDate[1];
        console.log('Date range selected:', startDate, endDate);
        return; // Handle range selection if needed
      } else {
        console.log('Multiple dates selected:', selectedDate);
        return; // Handle multiple dates if needed
      }
    } else if (selectedDate instanceof Date) {
      setDate(selectedDate); // Update state with selected date
      onDateSelect(selectedDate); // Call the parent function with selectedDate
    } else {
      setDate(null); // Update state if no date is selected
      onDateSelect(null); // Call the parent function with null
    }
  };

  return (
    <div>
      <label style={{ marginBottom: '8px', fontSize: '25px' }}>
        Select a date for the appointment
      </label>
      <Calendar
        onChange={handleDateChange} // Pass the updated handler
        value={date}
        minDate={new Date()} // Prevent selection of past dates
      />
    </div>
  );
};

export default BookingCalendar;
