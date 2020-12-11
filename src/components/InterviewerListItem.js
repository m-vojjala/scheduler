import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';


export default function InterviewListItem(props){
  // console.log(props)

  const InterviewerItemClass = classNames({'interviewers__item':true,
  'interviewers__item--selected':props.selected,
}) 
 return <li className={InterviewerItemClass} onClick={props.onChange}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Interviewer avatar"
  />
 {props.selected && props.name}
</li>
}