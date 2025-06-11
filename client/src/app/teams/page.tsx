'use client'

import { useGetTeamsQuery } from '@/State/api'
import React from 'react'
import { useAppSelector } from '../redux';
import Header from '@/Components/Header';
import { DataGrid, GridColDef, GridToolbarExportContainer } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { GridToolbar } from '@mui/x-data-grid/internals';

const CustomToolBar = () => (
    <GridToolbar className="toolbar flex gap-2">
        <GridToolbarExportContainer />
    </ GridToolbar>
)


const columns: GridColDef[] = [
    {field: "id", headerName: "Team ID", width: 100},
    {field: "teamName", headerName: "Team Name", width: 200},
    {field: "productOwnerUsername", headerName: "Product Owner", width: 200},
    {field: "projectManagerUsername", headerName: "Project Manager", width: 200},
]

const Teams = () => {
    const {data: teams, isLoading, isError } = useGetTeamsQuery();

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>
    if (isError || !teams) return <div>Error fetching teams</div>
  return (
    <div className='flex w-full flex-col p-8'>
        <Header 
            name='Teams'
        />
        <div 
        style={{height: 650, width: "100%"}}
        >
            <DataGrid
            rows={teams || []}
            columns={columns}
            pagination
            slots={{
                toolbar: CustomToolBar,
            }}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
            />
        </div>
    </div>
  )
}

export default Teams;