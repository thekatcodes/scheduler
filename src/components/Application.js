import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
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

	function bookInterview(id, interview) {
		// console.log(id, interview);

		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		setState({
			...state,
			appointments,
        });
        
		return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
			setState({
				...state,
				appointments,
			});
		});
    }
    
    function cancelInterview(id) {

		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		setState({
			...state,
			appointments,
        });
        
		return axios.delete(`/api/appointments/${id}`).then(() => {
			setState({
				...state,
				appointments,
			});
		});
    }

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
