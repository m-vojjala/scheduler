import React, { useState,useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment";
import Axios from "axios";


import "components/Application.scss";

export default function Application() {
  const [days,setDays] = useState([]);

  useEffect(()=>{
    Axios.get('api/days')
    .then(response=>setDays([...response.data]))
  },[]);

  
  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "3pm",
      interview: {
        student: "Archie Cohein ",
        interviewer: {
          id: 1,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/twYrpay.jpg",
        }
      }
    },
    {
      id: 3,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 2,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 4,
      time: "2pm"
    },   {
      id: 5,
      time: "4pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 3,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList days={days} setDay={setDays} /></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments.map(appointment=> <Appointment key={appointment.id} {...appointment} />)}
         <Appointment key="last" time="5pm" /> 
      </section>
    </main>
  );
}
