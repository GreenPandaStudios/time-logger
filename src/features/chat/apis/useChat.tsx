import { useAppSelector } from "../../../app/hooks";
import { getAllExperiences } from "../../../state";
import { IExperience } from "../../../types";
import { streamText } from "../../webserver";
import { useState, useEffect, useCallback } from "react";

interface IRequest extends IChatContext {
    log: IExperience[];
}

export interface IChatExchange {
    userMessage: string;
    botResponse: string;
}

interface IChatContext {
    message: string;
    previousMessages: IChatExchange[];
}


export function useChat(chatContext: IChatContext, onCompleteCallback: (response: string, message: string) => void, deps: [any]): [string, boolean] {
    const [summary, setSummary] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const experiences = useAppSelector(getAllExperiences);
    const message = chatContext.message;


    useEffect(() => {
        async function fetchSummary() {
            try {
                setLoading(true);
                var response = "";
                await streamText<IRequest>('/chat', { log: experiences, ...chatContext },
                    (data) => {
                        setSummary(data)
                        response = data;
                    }
                );
                setLoading(false);
                onCompleteCallback(response, message);
            }
            catch (e) {
                setLoading(false);
                onCompleteCallback("", message);
            }
        }
        if (experiences.length > 0 && message !== "") {
            fetchSummary();
        }
    }, [experiences, ...deps]);

    return [summary, loading];
}