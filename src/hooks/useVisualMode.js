import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

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

	const back = function () {
		// if (history.length > 1) {
		// 	const prevHistory = history.slice(0, -1);
		// 	setHistory(prevHistory);
		// 	setMode(prevHistory[prevHistory.length - 1]);
		// }
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
