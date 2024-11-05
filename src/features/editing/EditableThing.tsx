import React, { FormEvent, useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';


interface IEditableThing {
  id: string;
  oldText: string;
  oldNotes?: string;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onNotes?: (id: string, notes: string) => void;
}
export const EditableThing = (props: IEditableThing) => {
  const { id, oldText, oldNotes, onNotes, onEdit } = props;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(oldText);
  const [notes, setNotes] = useState(oldNotes);

  const onTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, [setText]);

  const onNotesChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  }, [setNotes]);

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
    if (onNotes !== undefined && notes !== undefined) {
      onNotes(id, notes);
    }
  }, [setEditing, text, notes]);


  return (
    <div className="d-flex align-items-center">
      {editing ?
        <Form onSubmit={onFinishedEditing} className="w-100 d-flex flex-column">
          <Form.Control autoFocus type="text" value={text} onChange={onTextChanged} className="me-2 mb-2" />

          {onNotes && (
            <>
              <Form.Label>Notes</Form.Label>
              <Form.Control onChange={onNotesChanged} value={notes} as="textarea" rows={3} />
            </>
          )}
          <div className="d-flex justify-content-left">
            <Button type="submit" variant="success" className="me-2">Save</Button>
            <Button variant="secondary" onClick={onCanceledEditing}>Cancel</Button>
          </div>
        </Form>
        :
        <div
          onClick={onClickedEdit}
          className="d-flex justify-content-left w-100"
        >
          <Button variant="link" className="p-1"  >
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