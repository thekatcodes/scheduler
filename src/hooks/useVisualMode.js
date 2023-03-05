import { useState } from "react";

/* Custom hook that returns helper functions that change which visual mode is being used */
export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

    /* Transitions from previous mode to a new mode */
	const transition = function (newMode, replace = false) {
		setHistory((prev) => {
			if (replace) {
				//replaces history
				return [...prev.slice(0, -1), newMode];
			} else {
				//adds to history
				return [...prev, newMode];
			}
		});
		setMode(newMode);
	};
    /* Sets the previous mode as the current mode */
	const back = function () {
		//goes back in history
		let prevHistory = [...history];
		if (history.length > 1) {
			prevHistory.pop();
		} else {
			prevHistory = [initial];
		}

		const mode = prevHistory[prevHistory.length - 1];

		setHistory(prevHistory);
		setMode(mode);
	};
	return { mode, transition, back };
}
