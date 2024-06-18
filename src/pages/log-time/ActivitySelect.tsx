import React, {useMemo} from 'react'
import { IActivity } from '../../types';
import { Form } from 'react-bootstrap';

interface IProps {
    activities: IActivity[];
    createNewActivity: (activity: IActivity) => void;
}

export const ActivitySelect = (props: IProps) => {

    const {activities, createNewActivity} = props
    const mapActivities = useMemo(() => {
        return activities.map(activity => {
            return <option key={activity.id} value={activity.id}>{activity.description}</option>
        })
        }, [activities])
  return (
    <Form.Select>
      <option>Choose an activity...</option>
    {mapActivities}
    </Form.Select>
  )
}
