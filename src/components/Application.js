import React from "react";
import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";

export default function Application() {
    const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const appointmentDisplay = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={state.interviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
			/>
		);
	});

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
