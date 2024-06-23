import React,{useState, useCallback}  from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Form, Button } from 'react-bootstrap'
import { addPlace } from '../../state/places/places-slice'


export const Places = () => {

    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const onSubmit = useCallback(() => {
        dispatch(addPlace({place: {description: name}}));
        setName("");
    },[name])
  return (
    <Form onSubmit={onSubmit}>
        <textarea onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setName(event.target.value)}>
        </textarea>
        <Button type="submit" disabled={name===""}>Add New Place</Button>
    </Form>
  )
}
