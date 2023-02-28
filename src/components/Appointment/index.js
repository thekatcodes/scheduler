import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";

	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		// id is the appointment id and interview is the object that includes student name and interviewer id.
        transition(SAVING);
		bookInterview(id, interview).then(()=> transition(SHOW));
    }

    function deleteAppointment() {
        transition(CONFIRM);
    }
    
    function confirm() {
        transition(DELETING);
		cancelInterview(id).then(()=> transition(EMPTY));
    }

	return (
		<article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
                    onDelete={deleteAppointment}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					onCancel={back}
                    onSave={save}
				/>
                )}
            {mode === SAVING && <Status message="Saving..." />}
            {mode === DELETING && <Status message="Deleting..." />}
            {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={confirm} />}
		</article>
	);
}
