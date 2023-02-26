export const getAppointmentsForDay = (state, day) => {
	//... returns an array of appointments for that day
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

export const getInterview = (state, interview) => {
	// console.log({...interview}); /* -> log { student: 'Archie Cohen', interviewer: 2 } */

    
	if (!interview) {
        return null;
    } else {
        const interviewer = state.interviewers[interview.interviewer];
        return {
            ...interview,
            interviewer: { ...interviewer }
        }
    }
    
};
