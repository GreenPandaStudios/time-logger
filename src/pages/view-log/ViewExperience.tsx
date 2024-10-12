import React, { useCallback, useMemo } from "react";
import { IExperience, IHaveId } from "../../types";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../state/experiences/experience-slice";

interface IProps {
	experience: IExperience & IHaveId;
	setRating: (rating: number) => void;
}
export const ViewExperience = (props: IProps) => {
	const { experience, setRating } = props;
	const dispatch = useDispatch();
	const inProgress = experience.end === undefined;
	const handleDelete = useCallback(() => {
		dispatch(deleteExperience({id: experience.id}));
	}, [
		experience.id,
		dispatch,
	]);

	const date = new Date(experience.start);
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
				{inProgress && <span>Since {new Date(experience.start).toLocaleTimeString()}, </span>}
				{inProgress ? "I have been " : "I was "}
				{experience.activity && experience.activity.description} {experience.place && "at " + experience.place.description}{" "}
				{!inProgress &&
					<span>{formatDuration(experience.start, experience.end)}</span>
				}
				{experience.people && experience.people.length > 0 && ` with ${peopleString}`}
				<div className="ratingScale">
					{["bi-emoji-tear", "bi-emoji-frown", "bi-emoji-neutral", "bi-emoji-smile", "bi-emoji-grin"]
					.map((icon, index) => (
						<Button key={index}
						className={index === experience.rating ? "ratingButton selected" : "ratingButton"}
						onClick={()=>setRating(index)}>
							<i className={"bi " + icon}></i>
						</Button>
					))}
				</div>
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
