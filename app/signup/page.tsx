import Link from 'next/link';
import React from 'react';

const SignUp = () => {
  return (
    <div className='relative sm:top-32 top-20  flex flex-col justify-center items-center  '>
      <h1 className='sm:text-2xl md:text-3xl relative top-2 sm:top-24 font-bold '>
        Create Your Account{' '}
      </h1>
      <form className='max-w-xl shadow-2xl  ml-20 mr-20 p-10 sm:p-36'>
        <div className='md:flex md:items-center mb-6 w-max'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              for='inline-email'
            >
              Email
            </label>
          </div>
          <div className='md:w-2/3 '>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800'
              id='inline-full-name'
              type='text'
              value='Jane Doe'
            />
          </div>
        </div>
        {/* password */}
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              for='inline-password'
            >
              Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800'
              id='inline-password'
              type='password'
              placeholder='******************'
            />
          </div>
        </div>
        {/* confirm password */}
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label
              className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              for='inline-password'
            >
              Confirm Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800'
              id='inline-password'
              type='password'
              placeholder='******************'
            />
          </div>
        </div>
        {/* terms */}
        <div className='md:flex md:items-center mb-6 md:justify-center'>
          <div className=''></div>
          <label className=' block text-gray-500 font-bold '>
            <input className='mr-2 leading-tight' type='checkbox' />
            <span className='text-sm'>
              I agree to our{' '}
              <strong className='text-green-800 hover:cursor-pointer'>
                <Link href='/terms' target='_blank'>
                  Terms of Service
                </Link>
              </strong>
            </span>
          </label>
        </div>
        {/* signup submit button */}
        <div className='md:flex md:items-center  md:justify-center '>
          <div className=''></div>
          <div className=''>
            <button
              className='shadow bg-green-700 hover:bg-green-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded  align-middle md:p-2 md:text-2xl md:w-50 '
              type='button'
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
