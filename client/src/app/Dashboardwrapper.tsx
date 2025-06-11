"use client";

import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Index'
import Sidebar from '../Components/Sidebar/Index'
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children : React.ReactNode}) => {
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900 '>
        {/*Sidebar*/}  
        <Sidebar />
    <main className={`flex flex-col w-full bg-gray-50 dark:bg-gray-950 ${sidebarCollapsed ? "" : "md:pl-64"}`} >
        <Navbar/>
        {children}
    </main>
    </div>
  )
};

const Dashboardwrapper = ({ children }: { children : React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  )
}

export default Dashboardwrapper;