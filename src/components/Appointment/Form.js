import React,{ useState } from "react";
import InterviewerList from "../../components/InterviewerList";
import Button from "../../components/Button";

export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const handleName = (event)=>{
    setName(event.target.value);
  }

  const reset = ()=>{
    setName("");
    setInterviewer(null);
  }
  const cancel = (event)=>{
    reset();
    props.onCancel();
  }

  const onSubmit = (event)=>{
    event.preventDefault();
    props.onSave(name,interviewer);
    reset();

  }

  // console.log(props)
  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={handleName}
        value={name}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={onSubmit}>Save</Button>
    </section>
  </section>
</main>
}