import React, { useMemo } from "react";
import { IExperience, IHaveId } from "../../types";
import { ListGroup } from "react-bootstrap";

interface IProps {
	experience: IExperience & IHaveId;
}
export const ViewExperience = (props: IProps) => {
	const { experience } = props;
	const inProgress = props.experience.end === undefined;

	const peopleString = useMemo(() => {
		let string = "";
		if (experience.people && experience.people.length > 0) {
			experience.people.forEach((person, index) => {
				string += person.name;

				if (index === experience.people.length - 2) {
					string += " and ";
				} else if (index !== experience.people.length - 1) {
					string += ", ";
				}
			});
			return string;
		}

		return "";
	}, [experience.people]);

	return (
		<>
			<ListGroup.Item>
				{inProgress ? "I have been " : "I was "}
				{experience.activity.description} at {experience.place.description}{" "}
				{inProgress ? (
					<span>since {new Date(experience.start).toLocaleTimeString()}</span>
				) : (
					<span>
						for{" "}
						{new Date(
							(experience.end ?? Date.now()) - experience.start
						).getMinutes()}{" "}
						minutes
					</span>
				)}
				{experience.people && experience.people.length > 0
					? " with " + peopleString
					: ""}
				.
			</ListGroup.Item>
		</>
	);
};
