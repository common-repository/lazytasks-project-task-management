import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import '@mantine/dates/styles.css';
import {useDispatch} from "react-redux";
import {editTask} from "../../../../Settings/store/taskSlice";
import dayjs from "dayjs";

const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const dbdateFormate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  let formattedDate = new Date(date).toLocaleDateString('en-US', options);

  // Remove the comma after the day
  formattedDate = formattedDate.replace(',', '');

  const [month, day, year] = formattedDate.split(' ');
  return `${day}-${month}-${year}`;
};

 


const inputDate = new Date("2024-02-05");
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = inputDate.toLocaleDateString('en-US', options);

// console.log(formattedDate); // Output: 5-Feb-2024


const DueDate = ({ editHandler, dueDate}) => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (date) => {
    editHandler(date);
    setSelectedDate(date);
    setCalendarVisible(false); // Hide calendar after selecting a date 
     
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarVisible(false); // Hide calendar when clicking outside of it
    }
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleCalendarClick = (event) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to the parent
  };
  return (
    <div className="due-select-btn cursor-pointer inline-block" onClick={toggleCalendar}>
      {selectedDate ? (
          <div className="due-selected text-[#4d4d4d] font-semibold text-[14px]">
              {formatDate(selectedDate)} {/* Render formatted date */}
          </div>
      ) : (
          dueDate === null ? (
              <div className="h-[32px] w-[32px] border border-dashed border-[#4d4d4d] rounded-full p-1">
                  <IconCalendarEvent color="#4d4d4d" size="22" /> 
              </div>
          ) : (
              <div className="due-selected text-[#4d4d4d] font-semibold text-[14px]">
                  {dbdateFormate(dueDate)}
              </div>
          )
      )}

      {calendarVisible && (
        <div ref={calendarRef} className="absolute bg-white border border-solid border-[#6191A4] rounded-sm p-2 z-[9]" onClick={handleCalendarClick}>
          <Calendar
            getDayProps={(date) => ({ 
              onClick: () => handleSelect(date),
            })}
          />
        </div>
      )}
    </div>
  );
};

export default DueDate;