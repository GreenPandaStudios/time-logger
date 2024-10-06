import React, { FormEvent, useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';


interface IEditableThing {
    id: string;
    oldText: string;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
  }
export const EditableThing = (props: IEditableThing) => {
    const { id, oldText, onEdit } = props;
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(oldText);
  
    const onTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    }, [setText]);
  
    const onClickedEdit = useCallback(() => {
      setEditing(true);
    }, [setText, setEditing]);

    const onClickedDelete = useCallback(() => {
        props.onDelete(id);
    }, []);
  
    const onCanceledEditing = useCallback(() => {
      setText(oldText);
      setEditing(false);
    }, [setEditing, oldText]);
  
    const onFinishedEditing = useCallback((e: FormEvent) => {
      e.preventDefault();
      setEditing(false);
      onEdit(id, text);
    }, [setEditing, text]);
  
  
    return (
      <div className="d-flex align-items-center">
        {editing ?
          <Form onSubmit={onFinishedEditing} className="w-100 d-flex flex-column">
            <Form.Control autoFocus type="text" value={text} onChange={onTextChanged} className="me-2 mb-2" />
            <div className="d-flex justify-content-left">
              <Button type="submit" variant="success" className="me-2">Save</Button>
              <Button variant="secondary" onClick={onCanceledEditing}>Cancel</Button>
            </div>
          </Form>
          :
          <div
            className="d-flex justify-content-left w-100"
          >
            <Button variant="link" className="p-1" onClick={onClickedEdit} >
              <i className="bi bi-pencil"></i>
            </Button>
            <span className="ps-2">{text}</span>
            <div className="ms-auto">
              <Button variant="link" className="p-1 text-danger" onClick={onClickedDelete}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </div>
        }
      </div>
    )
  }