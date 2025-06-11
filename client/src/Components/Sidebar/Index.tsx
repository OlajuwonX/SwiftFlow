'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { Briefcase, Home, Icon, LockIcon, LucideIcon, Search, Settings, Users, User, X, ChevronUp, ChevronDown, AlertCircle, ShieldAlert, AlertTriangle, AlertOctagon, Layers3 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { setSidebarCollapsed } from '@/State/Index';
import { useGetProjectsQuery } from '@/State/api';

const Index = () => {
 const [showProjects, setShowProjects] = useState(true);
 const [showPriority, setShowPriority] = useState(true);

 const {data: projects } = useGetProjectsQuery();
 const dispatch = useAppDispatch();
 const sidebarCollapsed = useAppSelector(
     (state) => state.global.sidebarCollapsed,
 );

const sidebarRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(setSidebarCollapsed(true));
      }
    };

    if (!sidebarCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarCollapsed, dispatch]);


 const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-gray-900 overflow-y-auto bg-white ${sidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames} ref={sidebarRef}>
        <div className='flex h-[100%] w-full flex-col justify-start'>
           {/* Top Logo */}
            <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-gray-900'>
                <div className='text-xl font-bold text-gray-800 dark:text-white'  >
                    SwiftFlow
                </div>

                {sidebarCollapsed ? null : (
                    <button className='py-3' onClick={() => {dispatch(setSidebarCollapsed(!sidebarCollapsed));
                    }}>
                        <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white' />
                    </button>
                ) }
            </div>

            {/* Team */}
            <div className='flex item-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                <img src='/logoImage.jpg' alt='logoImg' width={42} height={42} />
                <div>
                    <h3 className='text-md font-bold tracking-wide dark:text-gray-300'>
                        TEAM X
                    </h3>
                    <div className='mt-1 flex items-start gap-2'>
                      <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400 '/>  
                      <p className='text-xs text-gray-500'>Private</p>
                    </div>
                </div>
            </div>
            {/* Navbar Links */}
            <nav className='z-10 w-full  '>
                <SidebarLink icon={Home}
                label='Home'
                href='/' />
                <SidebarLink icon={Briefcase}
                label='Timeline'
                href='/timeline' />
                <SidebarLink icon={Search}
                label='Search'
                href='/search' />
                <SidebarLink icon={Settings}
                label='Settings'
                href='/settings' />
                <SidebarLink icon={User}
                label='Users'
                href='/users' />
                <SidebarLink icon={Users}
                label='Teams'
                href='/teams' />
            </nav>

            {/* PROJECTS */}
            <button onClick={() => setShowProjects((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer'>
                <span className=''>
                    Projects
                </span>
                {showProjects ? (
                    <ChevronUp className='h-5 w-5' />
                ) : (
                    <ChevronDown className='h-5 w-5' />
                )}
            </button>

            {/* Projects List */}
                {showProjects && projects?.map((project) => (
                    <SidebarLink
                    key={project.id}
                    icon={Briefcase}
                    label={project.name}
                    href={`/projects/${project.id}`} />
                ))}

            {/* PRIORITY */}
            <button onClick={() => setShowPriority((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer'>
                <span className=''>
                    Priority
                </span>
                {showPriority ? (
                    <ChevronUp className='h-5 w-5' />
                ) : (
                    <ChevronDown className='h-5 w-5' />
                )}
            </button>

            {showPriority && (
                <>
                <SidebarLink icon={AlertCircle}
                label='Urgent'
                href='/priority/urgent' />
                <SidebarLink icon={ShieldAlert}
                label='High'
                href='/priority/high' />
                <SidebarLink icon={AlertTriangle}
                label='Medium'
                href='/priority/medium' />
                <SidebarLink icon={AlertOctagon}
                label='Low'
                href='/priority/low' />
                <SidebarLink icon={Layers3}
                label='Backlog'
                href='/priority/backlog' />
                </>
            )}
        </div>
    </div>
  )
};

{/* Sidebar Link */}

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({
    href, 
    icon: Icon,
    label,
} : SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");


    return (
        <Link href={href} className='w-full'>
        <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-teal-200 dark:bg-black dark:hover:bg-gray-900 ${
            isActive ? 'bg-teal-100 text-white dark:bg-gray-700 hover:bg-teal-200 ' : ""
        } justify-start py-3 px-8 `}>
                {isActive && (
                    <div className='absolute left-0 top-0 h-[100%] w-[5px] bg-teal-200 dark:bg-blue-900'/>
                )}

                <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />

                <span className={`font-medium text-gray-800 dark:text-gray-100`} >
                    {label}
                </span>

        </div>
        </Link>
    )
}

export default Index