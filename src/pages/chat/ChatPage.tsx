
import { FormEvent, useCallback, useState } from "react";
import { ChatAPIs } from "../../features/chat"
import { Button, Form } from "react-bootstrap";

export const ChatPage = () => {
    const [question, setQuestion] = useState<string>("");
    const [text, setText] = useState<string>("");
    const summary = ChatAPIs.useChat(question, [question]);
    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        setQuestion(text);
        setText("");
    }
        , [text, setQuestion, setText]);

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
                <Button type="submit" variant="success" className="me-2">Ask</Button>
            </Form>
            <p>{summary}</p>
        </div>
    )

}