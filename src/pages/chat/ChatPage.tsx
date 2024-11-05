
import { FormEvent, useCallback, useState } from "react";
import { ChatAPIs, IChatExchange } from "../../features/chat"
import { Button, Form } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';

export const ChatPage = () => {
    const [question, setQuestion] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [chatExchange, setChatExchange] = useState<IChatExchange[]>([]);
    const onChatExchange = useCallback((response: string, message: string) => {
        setChatExchange([...chatExchange, { userMessage: message, botResponse: response }]);
    }, [chatExchange, setChatExchange]);

    const [response, loading] = ChatAPIs.useChat(
        {
            message: question,
            previousMessages: chatExchange
        },
        onChatExchange,
        [question]);

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        setQuestion(text);
        setText("");
    }
        , [text, setQuestion, setText]);



    return (
        <div className="ChatPage">
            <div className="chat-messages">
                {chatExchange.map((exchange, index) => (
                    <div key={index} className="chat-message">
                        <div className="chat-user-message">
                            <ReactMarkdown>{exchange.userMessage}</ReactMarkdown></div>
                        <div className="chat-bot-message"><ReactMarkdown>{exchange.botResponse}</ReactMarkdown></div>
                    </div>
                ))}
                {loading && (
                    <div key={"current"} className="chat-message">
                        <div className="chat-user-message">
                            <ReactMarkdown>{question}</ReactMarkdown>
                        </div>

                        <div className="chat-bot-message">
                            <ReactMarkdown>{response}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
            <div className="chat-input">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <Form onSubmit={onSubmit}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your message here..."
                        />
                        <Button type="submit" variant="success" className="me-2">
                            Send
                        </Button>
                    </Form>
                )}
            </div>
        </div>);
}