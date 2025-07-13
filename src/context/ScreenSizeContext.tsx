'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const mobileSize = 768;

type ScreenSizeContextType = {
  isMobile: boolean;
};

const ScreenSizeContext = createContext<ScreenSizeContextType>({ isMobile: false });

export const useScreenSize = () => useContext(ScreenSizeContext);

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= mobileSize);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};