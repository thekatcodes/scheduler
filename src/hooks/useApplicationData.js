import { useState, useEffect } from "react";
import { updateSpots } from "helpers/selectors";
import axios from "axios";

/* Custom hook that returns a number of helper functions that use the application data */
export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	/* Add booked interview
	 *
	 * @param {number} id represents the ID of the appointment being booked.
	 * @param {object} interview represents the interview data.
	 * @return {promise} returns the result of the axios.put() request.
	 * */

	const bookInterview = function (id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			const days = updateSpots(state, appointments);
			setState((prev) => ({
				...prev,
				appointments,
				days,
			}));
		});
	};

	/* Remove/Cancel booked interview
	 *
	 * @param {number} id represents the ID of the appointment being cancelled.
	 * @return {promise} returns the result of the axios.put() request.
	 */

	const cancelInterview = function (id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.delete(`/api/appointments/${id}`).then(() => {
			const days = updateSpots(state, appointments);
			setState((prev) => ({
				...prev,
				appointments,
				days,
			}));
		});
	};

	return { state, setDay, bookInterview, cancelInterview };
}
