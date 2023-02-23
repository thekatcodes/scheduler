import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
	const dayClass = classNames(
		"day-list__item",
		{ "day-list__item--selected": props.selected },
		{ "day-list__item--full": props.spots === 0 }
	);

	const formatSpots = function () {
		if (props.spots === 0) {
			return "no spots remaining";
		} else if (props.spots === 1) {
			return "1 spot remaining";
		} else if (props.spots === 2) {
			return "2 spots remaining";
		}
	};

	return (
		<li
			className={dayClass}
            onClick={() => props.setDay(props.name)}
            selected={props.selected}
		>
			<h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots()}</h3>
		</li>
	);
}
