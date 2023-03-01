import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

import PropTypes from 'prop-types'; 

export default function InterviewerList(props) {

    const { interviewers, value, onChange } = props;

    const ObjtoArray = (obj) => Object.assign([], Object.values(obj));

	const interviewerDisplay = ObjtoArray(interviewers).map((interviewer) => {
        return (
            <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id === value}	
                setInterviewer={() => onChange(interviewer.id)}
            />
			
        );
        
    });
    
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewers</h4>
			<ul className="interviewers__list"> {interviewerDisplay}</ul>
		</section>
	);
}

// Test with PropTypes that an interviewers array is passed 
InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  