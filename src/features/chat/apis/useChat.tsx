import { useAppSelector } from "../../../app/hooks";
import { getAllExperiences } from "../../../state";
import { IExperience } from "../../../types";
import { makeRequest } from "../../webserver";
import { useState, useEffect, useCallback } from "react";

interface IRequest {
    log: IExperience[];
    message: string;
}
interface IResponse {
    summary: string;
}

export function useChat(message: string, deps: [any]): string {
    const [summary, setSummary] = useState<string>("");
    const experiences = useAppSelector(getAllExperiences);



    useEffect(() => {
        async function fetchSummary() {
            const response = await makeRequest<IRequest, IResponse>('/chat', { log: experiences, message });
            if (response == undefined) {
                return;
            }
            setSummary(response.summary ?? "No summary available");
        }
        if (experiences.length > 0 && message !== "") {
            fetchSummary();
        }
    }, [experiences, ...deps]);

    return summary;
}