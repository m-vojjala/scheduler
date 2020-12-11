import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment";
import { getAppointmentsForDay,getInterview, getInterviewersForDay } from "../helpers/selectors"
import Axios from "axios";


import "components/Application.scss";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersOfADay = getInterviewersForDay(state,state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //  console.log(appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //  console.log(appointments)

    return Axios.put(`api/appointments/${id}`, appointment)
    .then(response=>setState({...state,appointments}))
  
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview:null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.delete(`api/appointments/${id}`)
    .then(response=>setState({...state,appointments}))
  
  }
 

  const setDay = day => setState({ ...state, day });
  // console.log(state.interviewers)


  useEffect(() => {
    Promise.all([Axios.get('api/days'),
    Axios.get('api/appointments'),
  Axios.get('api/interviewers')])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data,interviewers:all[2].data }));
      })
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList days={state.days} day={state.day} setDay={setDay} /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment =>  
         {
           const interview = getInterview(state, appointment.interview);
           return <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewersOfADay} bookInterview={bookInterview} cancelInterview={cancelInterview} />
         })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
