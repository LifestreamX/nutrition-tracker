'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { GoogleSignInButton } from '@/app/(navbarPages)/login/GoogleSignIn';
import { useMyContext } from '@/MyContext';

const LoginForm = (): JSX.Element => {
  const { data: userSession, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { width } = useWindowSize();
  const [message, setMessage] = useState('');
  const [loginTimeOutMessage, setLogInTimeOutMessage] = useState<string>('');
  const [googleClicked, setGoogleClicked] = useState(true);
  const { profileAvatar, setProfileAvatar } = useMyContext();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // submit logic
  const handleLoginButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('Signing In...');

    try {
      // Sign in using the credentials provider
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      // Check if the sign-in response is successful
      if (!signInResponse || signInResponse.ok !== true) {
        setMessage('Invalid Email Or Password');

        try {
          // Make a request to your custom login API route
          const res = await fetch('/api/loginfailed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          // Handle the response based on your server logic
          const data = await res.json();

          let message = data.message;

          if (message.startsWith('Too many login attempts.')) {
            setLogInTimeOutMessage(message);
          } else {
            setLogInTimeOutMessage('');
          }

          console.log(message);
        } catch (err) {
          console.log('FAILED REQUEST ', err);
        }
      } else {
        // Refresh the router to reflect the updated authentication status
        router.refresh();

        location.reload();
      }
    } catch (err) {
      // Log any errors that occur during sign-in
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    const grabGoogleAvatar = async () => {
      if (status === 'authenticated') {
        if (userSession.user?.image) {
          try {
            const res = await fetch('/api/googleProfileAvatar', {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain',
              },
              body: JSON.stringify({
                profileAvatar: userSession?.user?.image,
              }),
            });

            if (res.ok) {
              const data = await res.text();

              console.log(data);

              if (data === 'empty') {
                setProfileAvatar(null);
                // router.refresh();
              } else {
                setProfileAvatar(data);

                // router.refresh();
              }
            }

            // setProfileAvatar(userSession?.user?.image);
          } catch (error) {
            console.log(error);
          }
        }
        // If authenticated, redirect to the dashboard
        router.refresh();

        router.push('/dashboard');
      }
    };
    grabGoogleAvatar();
  }, [status]);

  let buttonSize = width < 768 ? 'medium' : 'large';

  let messageColor =
      message === 'Signing In...' ? 'text-black dark:text-white' : 'text-red-600';

    // Only show error for credentials login, not Google
    const showError = message && message !== 'Signing In...' && googleClicked;

  return (
    <form
      onSubmit={handleLoginButton}
      className='max-w-xl shadow-2xl  ml-20 mr-20 p-10 sm:p-36 dark:bg-gray-800 flex justify-center'
    >
      <h1 className='text-xl  sm:text-2xl md:text-3xl absolute top-6 font-bold  '>
        Sign In
      </h1>

      <div>
        <div className='md:flex md:items-center mb-6 w-max'>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/3'>
              <label
                htmlFor='inline-full-name'
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              >
                Email
              </label>
            </div>
            <div className='md:w-2/3 '>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-800'
                id='inline-full-name'
                required={googleClicked}
                value={email}
                type='email'
                onChange={handleEmailChange}
              />
            </div>
          </div>
        </div>
        {/* password */}
        <div className='md:flex md:items-center mb-6 flex-col'>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/3'>
              <label
                htmlFor='inline-password'
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
              >
                Password
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-800'
                id='inline-password'
                type='password'
                placeholder='********'
                required={googleClicked}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div
              className={`relative top-8 flex justify-center flex-col items-center `}
            >
              {showError && (
                <p className='md:top-4 relative text:lg md:text-xl font-semibold text-red-600'>
                  {message}
                </p>
              )}
              {loginTimeOutMessage && (
                <p className='md:top-10 text-red-600 relative text:lg md:text-xl font-semibold text-center'>
                  {loginTimeOutMessage}
                </p>
              )}
            </div>
        </div>
        <div className='md:flex md:items-center mb-6 flex-col'>
          <span className='flex mt-3'>{/* error would go here  */}</span>
        </div>
        {/* terms */}
        <div className='md:flex md:items-center mb-6 md:justify-center'>
          <div className=''></div>
          <label className=' block text-gray-500 font-bold'></label>
        </div>
        <div className='flex  flex-col justify-center items-center w-full'>
          <div
            className={` md:items-center  md:justify-center mb-6  flex-col  relative  w-full `}
          >
            <Button
              color='purple'
              size={buttonSize}
              // responsiveWidth={buttonWidith}
              type='submit'
              responsiveWidth='true'
            >
              <div
                role='status'
                className='h-8 flex flex-col justify-center items-center'
              >
                {message === 'Signing In...' ? (
                  <>
                    <svg
                      aria-hidden='true'
                      className='inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='sr-only'>Loading...</span>
                  </>
                ) : (
                  <p className=''>Login</p>
                )}
              </div>
            </Button>
          </div>

          <h1 className='font-bold'>Or</h1>

          {/* Google Auth Login */}
          <div className='w-full'>
            <GoogleSignInButton setGoogleClicked={setGoogleClicked} />
          </div>
        </div>
        <div className=' absolute text-sm md:text-lg bottom-2 md:bottom-2'>
          <Link href='./signup'>
            Don't have a account? Create one{' '}
            <span className='text-purple-400 hover:text-purple-800'>Here</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
