import React, { useCallback, useMemo } from "react";
import { IExperience, IHaveId } from "../../types";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteExperience, setJournal } from "../../state/experiences/experience-slice";
import { JournalEntry } from "./JournalEntry";
import RatingScale from "./RatingScale";

interface IProps {
	experience: IExperience & IHaveId;
	setRating: (rating: number) => void;
	setCognitiveFunction: (brainFunction: number) => void;
}
export const ViewExperience = (props: IProps) => {
	const { experience, setRating, setCognitiveFunction } = props;
	const dispatch = useDispatch();
	const inProgress = experience.end === undefined;

	const handleDelete = useCallback(() => {
		if (window.confirm("Are you sure you want to delete this experience?")) {
			dispatch(deleteExperience({id: experience.id}));
		}
	}, [
		experience.id,
		dispatch,
	]);
	
	const handleSetJournal = useCallback((journal: string) => {
		dispatch(setJournal({id: experience.id, journal}));
	},[experience.id, dispatch]);


	const date = new Date(experience.end ?? experience.start);
	const isNewDay = experience.end ? new Date(experience.end).getDay() !== new Date(experience.start).getDay() : true;

	const peopleString = useMemo(() => {
		if (!experience.people || experience.people.length === 0) return "";

		return experience.people
			.map((person, index) => {
				if (index === experience.people.length - 2) return `${person.name} and `;
				if (index === experience.people.length - 1) return person.name;
				return `${person.name}, `;
			})
			.join("");
	}, [experience.people]);

	const formatDuration = (start: number, end?: number) => {
		const durationMs = (end ?? Date.now()) - start;
		const duration = new Date(durationMs);

		const hours = Math.floor(durationMs / (1000 * 60 * 60));
		const minutes = duration.getMinutes();
		if (hours === 0 && minutes === 0) return "";
		if (hours === 0) return `for ${minutes} minutes`;
		return `for ${hours} hours, ${minutes} minutes`;
	};
	
	return (
		<>
			<ListGroup.Item className="ViewExperience">
				<div className="experienceText">
					{inProgress && <span>Since {new Date(experience.start).toLocaleTimeString()}, </span>}
					{inProgress ? "I have been " : "I was "}
					{experience.activity && experience.activity.description} {experience.place && "at " + experience.place.description}{" "}
					{!inProgress &&
						<span>{formatDuration(experience.start, experience.end)}</span>
					}
					{experience.people && experience.people.length > 0 && ` with ${peopleString}`}
				</div>
				
				<RatingScale
					title="How happy were you?"
					icons={["bi-emoji-tear", "bi-emoji-frown", "bi-emoji-neutral", "bi-emoji-smile", "bi-emoji-grin"]}
					selectedRating={experience.rating}
					onRatingSelect={setRating}
				/>
				<RatingScale
					title="How clear-headed were you?"
					icons={["bi-1-circle-fill", "bi-2-circle-fill", "bi-3-circle-fill", "bi-4-circle-fill", "bi-5-circle-fill"]}
					selectedRating={experience.cognitiveFunction}
					onRatingSelect={setCognitiveFunction}
				/>
				<JournalEntry entry={experience.journal} setEntry={handleSetJournal} />
				<div className="d-flex justify-content-between align-items-center mt-2">
					<div className="dateLabel">
						{isNewDay && date.toLocaleDateString()}
					</div>
					<Button variant="link" className="p-1 text-danger" onClick={handleDelete}>
						<i className="bi bi-trash"></i>
					</Button>
				</div>
				
			</ListGroup.Item>
		</>
	);
};
