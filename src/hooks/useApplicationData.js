import  { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData(){
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{},
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

  return {state,setDay,bookInterview,cancelInterview };
}
