"use client"

import { useAppSelector } from '@/app/redux'
import Header from '@/Components/Header'
import ModalNewTask from '@/Components/ModalNewTask'
import TaskCard from '@/Components/TaskCard'
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils'
import { Priority, Task, useGetTasksByUserQuery } from '@/State/api'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'

type Props = {
    priority: Priority
}

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100
  },
  {
    field: "description",
    headerName: "Description",
    width: 200
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className='inline-flex rounded-full bg-green-200 px-2 text-xs font-semibold leading-5 text-green-900'>
        {params.value}
      </span>
    )
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 135
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 135
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned"
  }
 ];

const ReuseablePriorityPage = ({priority}: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    const userId = 1;

    const {data: tasks, isLoading, isError: isTaskError} = useGetTasksByUserQuery(userId || 0, {
        skip: userId === null,
    });
  
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const filteredTasks = tasks?.filter((task: Task) => task.priority === priority);

    if (isTaskError || !tasks) return <div>Error fetching tasks</div>;

    return (
    <div className='m-5 p-4'>
        <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)}/>
            <Header name="Priority Page" buttonComponent={
                <button className='mr-3 rounded-md bg-blue-500 text-white px-4 py-2 font-bold hover:bg-blue-600 cursor-pointer' onClick={()=> setIsModalNewTaskOpen(true)}>Add Task</button>
            }
                />
            <div className='mb-4 flex justify-start'>
                <button className={`px-4 py-2 ${
                    view === "list" ? "bg-teal-800" : "bg-white"} rounded-l cursor-pointer `} onClick={()=> setView("list")}>List 
                </button>
                <button className={`px-4 py-2 cursor ${
                    view === "table" ? "bg-teal-800" : "bg-white"} rounded-r cursor-pointer`} onClick={()=> setView("table")}>Table 
                </button>
            </div>
            {isLoading ? (<div>Loading tasks...</div>) : view === "list" ? (<div className='grid grid-cols-1 gap-4'>
                {filteredTasks?.map((task: Task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
            ) : (
                view === "table" && filteredTasks && (
                    <div className="w-full">
                        <DataGrid 
                        rows={filteredTasks}
                        columns={columns}
                        getRowId={(row) => row.id}
                        className={dataGridClassNames}
                        sx={dataGridSxStyles(isDarkMode)}
                        />
                    </div>
                )
            )}
        </div>
  );
};

export default ReuseablePriorityPage