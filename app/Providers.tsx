'use client';

import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';

const ThemeSync = () => {
  const { data: session, status } = useSession();
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchAndApplyTheme = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const res = await fetch('/api/theme', {
            method: 'GET',
            headers: {
              'Content-Type': 'text/plain',
            },
          });

          if (res.ok) {
            const themePreference = await res.text();
            if (themePreference && (themePreference === 'dark' || themePreference === 'light')) {
              setTheme(themePreference);
            }
          }
        } catch (error) {
          console.log('Error fetching theme preference:', error);
        }
      }
    };

    fetchAndApplyTheme();
  }, [status, session, setTheme]);

  return null;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      storageKey='theme'
      attribute='class'
      defaultTheme='light'
      enableSystem={false}
    >
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
