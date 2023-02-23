import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
 
	let interviewers = props.interviewers;
	const interviewerDisplay = interviewers.map((interviewer) => {
        return (
            <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id===props.interviewer}	
                setInterviewer={() => props.setInterviewer(interviewer.id)}
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
