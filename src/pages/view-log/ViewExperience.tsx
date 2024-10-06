import React, { useMemo } from "react";
import { IExperience, IHaveId } from "../../types";
import { ListGroup } from "react-bootstrap";

interface IProps {
	experience: IExperience & IHaveId;
}
export const ViewExperience = (props: IProps) => {
	const { experience } = props;
	const inProgress = experience.end === undefined;

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
			<ListGroup.Item>
				{inProgress ? "I have been " : "I was "}
				{experience.activity.description} at {experience.place.description}{" "}
				{inProgress ? (
					<span>since {new Date(experience.start).toLocaleTimeString()}</span>
				) : (
					<span>{formatDuration(experience.start, experience.end)}</span>
				)}
				{experience.people && experience.people.length > 0 && ` with ${peopleString}`}
				.
			</ListGroup.Item>
		</>
	);
};
