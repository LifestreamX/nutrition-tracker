'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      storageKey='theme'
      attribute='class'
      defaultTheme='light'
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
