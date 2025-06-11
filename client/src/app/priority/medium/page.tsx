import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage'
import { Priority } from '@/State/api'

const Urgent = () => {
  return (
    <div>
        <ReuseablePriorityPage priority={Priority.Medium} />
    </div>
  )
}

export default Urgent