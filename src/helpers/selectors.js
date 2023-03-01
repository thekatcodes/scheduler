/* Get appointments for day */

export const getAppointmentsForDay = (state, day) => {
	const selectDay = state.days.find((days) => days.name === day);

	if (!selectDay) {
		return [];
	}

	const dayAppointments = selectDay.appointments;

	const selectAppointment = dayAppointments.map(
		(appointment) => state.appointments[appointment]
	);

	return selectAppointment;
};

/* Get interview */

export const getInterview = (state, interview) => {
	if (!interview) {
		return null;
	} else {
		const interviewer = state.interviewers[interview.interviewer];
		return {
			...interview,
			interviewer: { ...interviewer },
		};
	}
};

/* Get interviewers for day */

export const getInterviewersForDay = (state, day) => {
	const selectDay = state.days.find((days) => days.name === day);

	if (!selectDay) {
		return [];
	}

	const interviewersAppointments = selectDay.interviewers;

	const selectInterviewers = interviewersAppointments.map(
		(interviewer) => state.interviewers[interviewer]
	);

	return selectInterviewers;
};
