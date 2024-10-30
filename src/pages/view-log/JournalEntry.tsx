
import { useCallback } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";


interface IProps {
    setEntry: (entry: string) => void;
    entry?: string;
}


export const JournalEntry = (props: IProps) => {
    const { setEntry, entry } = props;
  return (
    <div className="JournalEntry">
      <p className='notesTitle text-center'>What notes do you have?</p>
      <Form.Control as="textarea" rows={3} value={entry} onChange={(e) => setEntry(e.target.value)} />
    </div>
  );
}