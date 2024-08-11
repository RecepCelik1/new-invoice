import React, { useState, useRef, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  setYear,
  subMonths,
  addMonths
} from "date-fns";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CSSTransition } from 'react-transition-group';
import "../styles/datepicker.css"; 

const Datepicker = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("day");
  const [yearPage, setYearPage] = useState(Math.floor((new Date().getFullYear() - currentDate.getFullYear() + 100) / 16));
  const nodeRef = useRef(null);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
    setView("day");
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
    onDateChange(date);
    toggleDatepicker();
  };

  const handleMonthClick = (month) => {
    const newDate = setYear(month, currentDate.getFullYear());
    setCurrentDate(newDate);
    onDateChange(newDate);
    setView("day");
  };

  const handleYearClick = (year) => {
    const newDate = setYear(currentDate, year);
    setCurrentDate(newDate);
    onDateChange(newDate);
    setView("month");
  };

  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
  });

  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate)
  });

  const years = Array.from({ length: 201 }, (_, i) => new Date().getFullYear() - 100 + i);

  const nextYearRange = () => {
    setYearPage((yearPage + 1) % Math.ceil(years.length / 16));
  };

  const prevYearRange = () => {
    setYearPage((yearPage - 1 + Math.ceil(years.length / 16)) % Math.ceil(years.length / 16));
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center justify-between bg-white p-2 border rounded-md shadow cursor-pointer" onClick={toggleDatepicker}>
        <span>{format(currentDate, "PPP")}</span>
        <FiCalendar />
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
  <div ref={nodeRef} className="datepicker-menu absolute top-12 left-0 z-50 bg-white rounded-md shadow-lg p-4">
  <div className="flex items-center justify-between mb-2">
            <FiChevronLeft className="cursor-pointer hover:text-blue-500" onClick={view === "year" ? prevYearRange : prevMonth} />
            <span className="cursor-pointer hover:text-blue-500" onClick={() => setView("year")}>{format(currentDate, "yyyy")}</span>
            <span className="cursor-pointer hover:text-blue-500" onClick={() => setView("month")}>{format(currentDate, "MMMM")}</span>
            <FiChevronRight className="cursor-pointer hover:text-blue-500" onClick={view === "year" ? nextYearRange : nextMonth} />
          </div>
          {view === "day" && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center font-medium ${index === 5 || index === 6 ? "text-red-500" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  return (
                    <div
                      key={day}
                      className={`p-2 text-center rounded cursor-pointer ${
                        isSameDay(day, currentDate)
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-200"
                      } ${isCurrentMonth ? "" : "text-gray-400"}`}
                      onClick={() => handleDateClick(day)}
                    >
                      {format(day, "d")}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {view === "month" && (
            <div className="grid grid-cols-3 gap-1">
              {months.map((month) => (
                <div
                  key={month}
                  className="p-2 text-center rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => handleMonthClick(month)}
                >
                  {format(month, "MMM")}
                </div>
              ))}
            </div>
          )}
          {view === "year" && (
            <div className="grid grid-cols-4 gap-1">
              {years.slice(yearPage * 16, yearPage * 16 + 16).map((year) => (
                <div
                  key={year}
                  className={`p-2 text-center rounded cursor-pointer ${year === currentDate.getFullYear() ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </CSSTransition>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleDatepicker}></div>}
    </div>
  );
};

export default Datepicker;
