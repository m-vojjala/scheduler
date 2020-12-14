import  { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData(){
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{}
});
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days= [...state.days];
    const day = days.find(day=>day.name===state.day);
   // console.log(day)
    //  day.spots = day.appointments.reduce((acc,curr)=> acc += state.appointments[curr].interview ? 0 : 1 , 0)
    //  console.log(day)
      day.spots -= 1;
     setState({...state,appointments,days})
    return Axios.put(`api/appointments/${id}`, appointment)
    .then((response)=>setState({...state,appointments,days}))
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
    const days= [...state.days];
    const day = days.find(day=>day.name===state.day);
    day.spots += 1;
    
    return Axios.delete(`api/appointments/${id}`)
    .then((response)=>setState({...state,appointments,days}))
  
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

  return {state,setDay,bookInterview,cancelInterview };
}
