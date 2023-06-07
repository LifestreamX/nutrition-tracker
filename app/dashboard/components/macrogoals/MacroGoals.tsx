'use client';

import React, { useState } from 'react';
import { useMyContext } from '../../../../MyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MyDatePicker from './DatePicker';
import { CaloriesProgress, MacroProgressBar } from './MacroProgressBar';
import Button from '@/app/components/Button';

const MacroGoals = () => {
  const {
    macroTargets,
    setMacroTargets,
    // macroTargetInputs,
    // setMacroTargesInputs,
  } = useMyContext();
  const [showMacroForm, setShowMacroForm] = useState(false);
  const [showDateForm, setShowDateForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [macroTargetInputs, setMacroTargesInputs] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const CustomInput = ({ value, onClick }) => (
      <input
        type='text'
        className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500'
        value={value}
        onClick={onClick}
        readOnly
      />
    );

    setMacroTargesInputs((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setMacroTargets({
      ...macroTargets,
      calories: macroTargetInputs.calories,
      protein: macroTargetInputs.protein,
      carbs: macroTargetInputs.carbs,
      fats: macroTargetInputs.fats,
    });

    setMacroTargesInputs({
      ...macroTargetInputs,
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
  };

  const handleCancel = () => {
    setMacroTargesInputs({
      ...macroTargetInputs,
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDateForm(false);
  };

  return (
    <section>
      {/* Button for setting the target goals  */}
      <div className='flex items-center justify-center mt-20 flex-col mb-5'>
        {!showMacroForm && !showDateForm && (
          <div>
            <Button
              color='purple'
              size='medium'
              onClick={() => setShowMacroForm(true)}
            >
              Set Macro Goals
            </Button>

            <button className='ml-5 mr-5'>
              <MyDatePicker />
            </button>
            {/* <button
              onClick={() => setShowDateForm(true)}
              className='bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Set Date
            </button> */}
          </div>
        )}

        {/* MACRO SET */}
        <dialog className='relative top-40' open={showMacroForm}>
          <form
            action=''
            className='mt-5 bg-white w-full  p-14 rounded-lg shadow-lg flex flex-col relative justify-center items-center'
          >
            <div className=' min-w-full '>
              <div className='flex justify-end mt-3'>
                <label htmlFor='macroCalories' className='mr-3'>
                  Calories{' '}
                </label>
                <input
                  type='number'
                  name='calories'
                  id='macroCalories'
                  value={macroTargetInputs.calories}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              </div>

              <div className='flex justify-end mt-3 '>
                <label htmlFor='macroProtein' className='mr-3'>
                  Protein
                </label>
                <input
                  type='number'
                  name='protein'
                  id='macroProtein'
                  value={macroTargetInputs.protein}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              </div>
              <div className='flex justify-end mt-3'>
                <label htmlFor='macroCarbs' className='mr-3'>
                  Carbs
                </label>
                <input
                  type='number'
                  name='carbs'
                  id='macroCarbs'
                  value={macroTargetInputs.carbs}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              </div>

              <div className='flex justify-end mt-3'>
                <label htmlFor='macroFats' className='mr-3'>
                  Fats
                </label>
                <input
                  type='number'
                  name='fats'
                  id='macroFats'
                  value={macroTargetInputs.fats}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              </div>
            </div>

            <div className='flex w-full justify-around relative top-4 '>
              <Button
                color='purple'
                size='medium'
                onClick={() => {
                  setShowMacroForm(false);
                  handleSubmit();
                }}
              >
                Save
              </Button>

              <Button
                color='red'
                size='medium'
                onClick={() => {
                  setShowMacroForm(false);
                  handleCancel();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </dialog>

        {/* for Calories Burned / calories consumed  / calories remaining targets */}

        {!showMacroForm && (
          <section className='w-screen h-32  mt-10 flex flex-col items-center relative md:flex-row md:justify-center md:top-20 md:justify-evenly '>
            {/*  Left Side*/}
            <div className=' w-1/3 bg-white rounded-lg shadow-lg'>
              <MacroProgressBar />
            </div>

            {/* Right Ride */}
            <div className=' w-1/3 bg-white rounded-lg shadow-lg flex justify-evenly items-center'>
              <CaloriesProgress />
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default MacroGoals;
