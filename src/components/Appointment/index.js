import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";

	const { id, time, interview, interviewers, bookInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		// id is the appointment id and interview is the object that includes student name and interviewer id.
		transition(SAVING)
		bookInterview(id, interview);
		transition(SHOW);
	}
	return (
		<article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					onCancel={back}
					onSave={save}
				/>
                )}
            {mode === SAVING && <Status message="Saving..."/>}
		</article>
	);
}
