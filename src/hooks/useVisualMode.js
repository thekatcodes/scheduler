import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (newMode, replace = false) {
        setMode(newMode);
        
		setHistory((prev) => { 
            if (replace) {
                //replaces history
                return [...prev.slice(0,-1), newMode]
            } else {
                //adds to history
                return [...prev, newMode]
            }
		});
    };
    
    const back = function() {
        //goes back in history
		if (history.length > 1) {
			const prevHistory = history.slice(0, -1);
			setHistory(prevHistory);
			setMode(prevHistory[prevHistory.length - 1]);
		}
	};
	return { mode, transition, back };
}
