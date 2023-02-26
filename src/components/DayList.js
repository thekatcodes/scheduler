import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	let days = props.days;
	let daysDisplay = days.map((day) => {
		return (
				<DayListItem
					key={day.id}
					name={day.name}
					spots={day.spots}
					selected={day.name === props.value}
					setDay={props.onChange}
				/>
		);
	});

	return <ul>{daysDisplay}</ul>;
}