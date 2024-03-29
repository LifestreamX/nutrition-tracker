'use client';

import { useMyContext } from '@/MyContext';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker: React.FC = () => {
  const { selectedDate, setSelectedDate } = useMyContext();

  const handleDateChange = async (date: Date | null) => {
    let currentDate;

    if (date) {
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      currentDate = [formattedDate];
      setSelectedDate(currentDate[0]);

      let newDate = currentDate[0];

      // localStorage.setItem('selectedDate', JSON.stringify(currentDate));
      try {
        const res = await fetch('/api/selectedDate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Change content type to JSON
          },
          body: JSON.stringify({ selectedDate: newDate }),
        });

        let data = await res.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : null}
      // selected={selectedDate ? selectedDate?.dateObject : null}
      onChange={handleDateChange}
      dateFormat='EEEE, d MMMM yyyy'
      className='text-center  text-purple-500 hover:text-purple-800   cursor-pointer p-1 rounded-lg font-semibold  text-lg  placeholder-purple-500 hover:placeholder-purple-800 dark:bg-purple-800 dark:placeholder-white dark:hover:placeholder-white dark:hover:bg-purple-900   '
      placeholderText={'Select a Date'}
    />
  );
};

export default MyDatePicker;
