import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage'
import { Priority } from '@/State/api'

type Props = {}

const Urgent = (props: Props) => {
  return (
    <div>
        <ReuseablePriorityPage priority={Priority.Urgent} />
    </div>
  )
}

export default Urgent