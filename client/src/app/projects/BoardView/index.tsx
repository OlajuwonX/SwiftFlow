import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/State/api';
import React from 'react'
import { useDrop, DndProvider, useDrag } from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import { Task as TaskType} from '@/State/api';
import { EllipsisVertical, MessageSquareMore, Plus } from 'lucide-react';
import {format} from 'date-fns';
import Image from 'next/image';

type BoardProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"]

const BoardView = ({id, setIsModalNewTaskOpen}: BoardProps) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });



const [updateTaskStatus] = useUpdateTaskStatusMutation();

const moveTask = (taskId: number, toStatus: string) => {
  updateTaskStatus({taskId, status: toStatus});
};

if (isLoading) return <div>Loading ...</div>
if (error) return <div>An error occured while fetching tasks</div>

  return (
<DndProvider backend={HTML5Backend}>
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4'>
      {taskStatus.map((status) => (
        <TaskColumn 
        key={status}
        status={status}
        tasks={tasks || []}
        moveTask={moveTask}
        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      ))}
    </div>
</DndProvider>  )
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number}) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: monitor.isOver()
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#991B1B",
    "Work In Progress": "#2563E2",
    "Under Review": "#097706",
    Completed: "#000000"
  }

  return (
    <div
    ref ={(instance) => {
      drop(instance)
    }}
    className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}>
      <div className='mb-3 flex w-full '>
        <div 
        style={{ backgroundColor: statusColor[status] }} 
        className="w-2 rounded-s-lg" />
        <div className='flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-gray-900'>
          <h3 className='flex items-center text-lg font-semibold dark:text-white'>
            {status}{" "}
          <span className='ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary'
          style={{width: "1.5rem", height: "1.5rem" }}>
            {tasksCount}
          </span>
          </h3>
          <div className='flex items-center gap-1'>
            <button className='flex h-6 w-5 items-center justify-center dark:text-neutral-500 cursor-pointer'>
              <EllipsisVertical size={26} />
            </button>
            <button className='flex w-6 h-6 items-center justify-center rounded bg-gray-200 dark:bg-neutral-700 dark:text-white cursor-pointer' 
            onClick={() => setIsModalNewTaskOpen(true)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>  

      {tasks.filter((task) => task.status === status ).map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType
}

const Task = ({task}: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id: task.id},
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  const taskTagSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate ? format(new Date(task.startDate), "P") : "";

  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "";

  const numberOfComments = (task.comments && task.comments.length ) || 0;

  const PriorityTag = ({priority }: {priority: TaskType["priority"]}) => (
    <div className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? "bg-red-200 text-red-700" : priority === "High" ? "bg-yellow-200 text-yellow-700" : priority === "Medium" ? "bg-green-200 text-green-700" : priority === "Low" ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-700"}`}>
      {priority}
    </div>
  );

  return (
    <div ref={(instance) => {
      drag(instance)}}
      className={`mb-4 rounded-md bg-white shadow dark:bg-gray-900 ${isDragging ? "opacity-50" : "opacity-100"}`}>
          {task.attachments && task.attachments.length > 0 && ( 
          <Image 
          src={`/${task.attachments[0].fileURL}`} 
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className='h-auto w-full rounded-t-md' 
          />
        )}
        <div className='p-4 md:p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-1 flex-wrap items-center gap-2'>
              {task.priority && <PriorityTag priority={task.priority} />}
              <div className='flex gap-2'>
                {taskTagSplit.map((tag) => (
                    <div  key={tag} className='rounded-full bg-blue-100 px-2 py-1 text-xs'>
                        {" "}
                        {tag}
                    </div>
                ))}
              </div>
            </div>
            <button className='flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500 cursor-pointer'>
              <EllipsisVertical size={26} />
            </button>
          </div>
          <div className='my-3 flex-col justify-between'>
                <h4 className='text-md font-bold dark:text-white'>{task.title}</h4>
                {typeof task.points === "number" && (
                  <div className='text-xs font-semi-bold dark:text-white'>
                    {task.points} pts
                  </div>
                )}
                  <div className='text-xs text-gray-500 dark:text-neutral-500'>
                    {formattedStartDate && <span>{formattedStartDate} - </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                  </div>
                  <p className='text-sm text-gray-600 dark:text-neutral-500'> {task.description}</p>
                  <div className='mt-4 border-t border-gray-200 dark:border-gray-800' />

                  {/* Users */}
                  <div className='justify-between flex mt-3 items-center'>
                    <div className='flex -space-x-[6px] overflow-hidden'>
                      {task.assignee && (
                        <Image 
                      key={task.assignee.userId}
                      src={`/${task.assignee.profilePictureUrl!}`} 
                      alt={task.assignee.username}
                      width={30}
                      height={30}
                      className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-900 cursor-pointer'
                      />
                      )}
                      {task.author && (
                        <Image 
                      key={task.author.userId}
                      src={`/${task.author.profilePictureUrl!}`} 
                      alt={task.author.username}
                      width={30}
                      height={30}
                      className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-900 cursor-pointer'
                      />
                      )}
                    </div>
                    <div className='flex items-center text-gray-500 dark:text-neutral-500'>
                      <MessageSquareMore size={20} className='cursor-pointer'/>
                      <span className='ml-1 text-sm dark:text-neutral-400'>
                        {numberOfComments}
                      </span>
                    </div>
                  </div>
          </div>
        </div>
    </div>
  )
};

export default BoardView;