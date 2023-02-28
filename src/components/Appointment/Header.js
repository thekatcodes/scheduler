import React from "react";

export default function Header(props) {
    const { time } = props;
    console.log(time)
	return (
		<header className="appointment__time" >
            <h4 className="text--semi-bold">{time}</h4>
			<hr className="appointment__separator" />
		</header>
	);
}
