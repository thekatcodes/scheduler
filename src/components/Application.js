import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		// you may put the line below, but will have to remove/comment hardcoded appointments variable
		// appointments: {}
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			axios.get("api/days"),
			axios.get("api/appointments"),
			axios.get("api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const appointmentDisplay = Object.values(dailyAppointments).map(
		(appointment) => {
			return (
				<Appointment
					key={appointment.id}
					{...appointment}
				/>
			);
		}
	);

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList
						days={state.days}
						value={state.day}
						onChange={setDay}
					/>
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">{appointmentDisplay}</section>
		</main>
	);
}
