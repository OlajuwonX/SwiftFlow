import { useAppSelector } from '@/app/redux';
import Header from '@/Components/Header';
import { useGetTasksQuery } from '@/State/api';
import React from 'react'
import {DataGrid} from "@mui/x-data-grid"

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
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
    width: 130
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
 ]

const TableView = ({id, setIsModalNewTaskOpen}: Props) => {
  
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
   
   const {
      data: tasks,
      error,
      isLoading,
   } = useGetTasksQuery({projectId: Number(id) })

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>And error occurred while fetching tasks</div>;
  
  return (
    <div className='h-[540px]  w-full px-4 pb-6 xl:px-6 '>
      <div className='pt-5'>
        <Header name='Table' isSmallText />
      </div>
      <DataGrid 
      rows={tasks || []}
      columns={columns}
      />
    </div>
  )
}

export default TableView