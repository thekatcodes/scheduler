import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

    const { spots, selected, name, setDay } = props;

	const dayClass = classNames(
		"day-list__item",
		{ "day-list__item--selected": selected },
		{ "day-list__item--full": !spots }
	);

	const formatSpots = function () {
		if (!spots) {
			return "no spots remaining";
        }
        
        if (spots === 1) {
			return "1 spot remaining";
        } 
        
		return `${spots} spots remaining`;
	};

	return (
		<li
			className={dayClass}
            onClick={() => setDay(name)}
            data-testid="day"
		>
			<h2 className="text--regular">{name}</h2>
            <h3 className="text--light">{formatSpots()}</h3>
		</li>
	);
};
