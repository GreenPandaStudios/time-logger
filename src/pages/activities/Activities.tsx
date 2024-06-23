import React,{useState, useCallback}  from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Form, Button } from 'react-bootstrap'
import { addActivity } from '../../state/activities/activity-slice'


export const Activities = () => {

    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const onSubmit = useCallback(() => {
        dispatch(addActivity({activity: {description: name}}));
        setName("");
    },[name])
  return (
    <Form onSubmit={onSubmit}>
        <textarea onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setName(event.target.value)}>
        </textarea>
        <Button type="submit" disabled={name===""}>Add New Activity</Button>
    </Form>
  )
}
