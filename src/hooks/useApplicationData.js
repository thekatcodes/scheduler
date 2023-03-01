import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
    });
    
  
/* Get Spots Remaining */

function decrementSpots(state) {

    const newDays = [];
  
    for (const day of state.days) {
      if (day.name === state.day) {
        newDays.push({...day, spots: day.spots-1})
      } else {
        newDays.push(day);
      }
    }
    return newDays;
  };
  
function incrementSpots(state) {
    const newDays = [];
    for (const day of state.days) {
      if (day.name === state.day) {
        newDays.push({...day, spots: day.spots+1})
      } else {
        newDays.push(day);
      }
    }
    return newDays;
  };

	const bookInterview = function(id, interview) {
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
        
        const days = decrementSpots(state);

		return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
			setState({
				...state,
                appointments,
                days
			});
		});
    }
    
    const cancelInterview = function(id) {

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
        
        const days = incrementSpots(state);

		return axios.delete(`/api/appointments/${id}`).then(() => {
			setState({
				...state,
                appointments,
                days
			});
        });
    };

    const setDay = (day) => setState({ ...state, day });

    useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
        ]).then((all) => {
            console.log(all);
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
    }, []);
    
    return {state, setDay, bookInterview, cancelInterview}
}