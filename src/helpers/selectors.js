export function getAppointmentsForDay(state, day) {
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
}
