import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
    return (
        <div className="relative">
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                calendarClassName="react-datepicker-custom-calendar"
                popperClassName="react-datepicker-custom-popper"
                wrapperClassName="react-datepicker-custom-wrapper"
                placeholderText="Select a date"
            />
        </div>
    );
};

export default CustomDatePicker;
