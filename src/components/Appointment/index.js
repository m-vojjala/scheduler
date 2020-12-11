import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from ".././../hooks/useVisualMode";


import "../Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // console.log(props);
return <article className="appointment">
  <Header time={props.time}/>
  {mode === SHOW && <Show student={props.interview.student}  interviewer={props.interview.interviewer} />} 
  {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
  {mode === CREATE && <Form onCancel={()=>back()} onSave={()=>transition(STATUS)} interviewers={props.interviewers} />}
</article>
}