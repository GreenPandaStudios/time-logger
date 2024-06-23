import React,{useState, useCallback}  from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Form, Button } from 'react-bootstrap'
import { addPerson } from '../../state/people/people-slice'


export const People = () => {

    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const onSubmit = useCallback(() => {
        dispatch(addPerson({person: {name: name}}));
        setName("");
    },[name])
  return (
    <Form onSubmit={onSubmit}>
        <textarea onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setName(event.target.value)}>
        </textarea>
        <Button type="submit" disabled={name===""}>Add New Person</Button>
    </Form>
  )
}
