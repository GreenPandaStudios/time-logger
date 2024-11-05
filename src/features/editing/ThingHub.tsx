import React, { useState, useCallback, FormEvent } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { EditableThing } from './EditableThing';
import { IHaveId } from '../../types';



interface IThing extends IHaveId {
    userEnteredName: string;
    notes?: string;
}

interface IProps {
    title: string;
    instructions?: string;
    things: IThing[];
    onEdit: (id: string, userEnteredName: string) => void;
    onDelete: (id: string) => void;
    onCreate: (userEnteredName: string) => void;
    onNotes?: (id: string, notes: string) => void;
}

export const ThingHub = (props: IProps) => {
    const { things, onEdit, onDelete, onCreate, instructions, onNotes } = props;
    const [name, setThingName] = useState("");

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        onCreate(name);
        setThingName("");
    }, [name])


    return (
        <div className="container mt-4">
            <div className="my-4"></div>
            <h1>{props.title}</h1>
            <ListGroup className="mb-4">
                {Object.values(things).map((thing) =>
                    <ListGroup.Item key={thing.id} className="d-flexalign-items-center">
                        <EditableThing oldText={thing.userEnteredName} id={thing.id} oldNotes={thing.notes}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onNotes={onNotes} />
                    </ListGroup.Item>)}
                <ListGroup.Item>
                    <Form onSubmit={onSubmit} className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder={instructions}
                            value={name}
                            onChange={
                                (event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setThingName(event.target.value)}
                            className="me-2"
                        />
                        <Button type="submit" disabled={name === ""} className="btn btn-primary">Create</Button>
                    </Form>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}