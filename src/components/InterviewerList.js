import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
    const { interviewers, value, onChange } = props;
    console.log(interviewers)
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
