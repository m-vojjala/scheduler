import React from "react";
import PropTypes from 'prop-types';
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  // console.log(props);

  const InterviewerListItems = props.interviewers.map(interviewer => <InterviewListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={props.value === interviewer.id} onChange = {(event)=>props.onChange(interviewer.id)}/>)
  
  return <section className="interviewers" >
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewerListItems}</ul>
  </section>
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
