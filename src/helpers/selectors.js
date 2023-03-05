/* Get appointments for day 
*
 * @param {object} state represents the state of the application.
 * @param {string} day represents the specified day.
 * @return {array} returns the appointments array with all of the appointments for the specified day.
 */

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

/* Get interview 
 *
 * @param {object} state represents the state of the application.
 * @param {object} interview represents the specified interview.
 * @return {object} returns an interview object with the corresponding interviewer data attached to it.
 * */

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

/* Get interviewers for day 
 *
 * @param {object} state represents the state of the application.
 * @param {string} day represents the specified day.
 * @return {array} returns the interviewers array, which contains all of the interviewers for the specified day.
 */

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

/* Updates appointment spots remaining 
 *
 * @param {object} state represents the state of the application.
 * @param {object} appointments represents an object containing all the appointments of the day.
 * @return {array}  returns a newDays array which shows the updated number of spots available for each day.
 */

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
  