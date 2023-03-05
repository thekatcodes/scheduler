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

/* Updates appointment spots remaining */

 export function updateSpots(state, appointments) {
    const index = state.days.findIndex((d) => d.name === state.day);
  
    const dayObj = state.days[index];
  
    let spots = 0;
  
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
  
    const newDays = [...state.days];
    const day = { ...dayObj, spots };
    newDays[index] = day;
  
    return newDays;
  }
  