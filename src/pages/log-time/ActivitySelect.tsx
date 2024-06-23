import React, {useCallback, useMemo} from 'react'
import { IActivity, IHaveId } from '../../types';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { getAllActivities } from '../../state/activities/activity-slice';


interface IProps {
    onChange: (activity: (IActivity & IHaveId)) => void;
}

export const ActivitySelect = (props: IProps) => {

    const activities = useAppSelector(getAllActivities);
    const { onChange} = props
    const mapActivities = useMemo(() => {
        return Object.values(activities).map(activity => {
            return <option key={activity.id} value={activity.id}>{activity.description}</option>
        })
        }, [activities])

    const onOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(activities[event.target.value]);
     },[onChange, activities]);

    return (
        <Form.Select onChange={onOptionChange}>
            <option>Choose an activity...</option>
            {mapActivities}
        </Form.Select>
    )
}
