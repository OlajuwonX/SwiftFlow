import Header from '@/Components/Header';
import React from 'react'


const Settings = () => {
    const userSettings = {
        username: 'Phantom Dev',
        email: 'phantom.dev@example.com',
        teamName: 'Development Team',
        roleName: 'Developer'
    }

    const labelStyles = 'block dark:text-white text-sm font-medium';

    const textStyles = 'mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white';

  return (
    <div>
        <Header 
        name='Settings'
        />
        <div className='space-y-4'>
            <div>
                <label className={labelStyles}>
                    Username
                </label>
                <div className={textStyles}>{userSettings.username}</div>
            </div>
            <div>
                <label className={labelStyles}>
                    Email
                </label>
                <div className={textStyles}>{userSettings.email}</div>
            </div>
            <div>
                <label className={labelStyles}>
                    Team
                </label>
                <div className={textStyles}>{userSettings.teamName}</div>
            </div>
            <div>
                <label className={labelStyles}>
                    Role
                </label>
                <div className={textStyles}>{userSettings.roleName}</div>
            </div>
        </div>
    </div>
  )
}

export default Settings