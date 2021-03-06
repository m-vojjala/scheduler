import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // to book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let spotsCount = 0;
    const days = [...state.days];
    const dayIndex = days.findIndex(day => day.name === state.day);
    days[dayIndex].appointments.forEach(appointmentId => {
      if (!appointments[appointmentId].interview) {
        spotsCount += 1;
      }
    })
    days[dayIndex].spots = spotsCount;
    return axios.put(`api/appointments/${id}`, appointment)
      .then((response) => setState({ ...state, appointments, days }))
  }

  // to destroy/delete an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let spotsCount = 0;
    const days = [...state.days];
    const dayIndex = days.findIndex(day => day.name === state.day);
    days[dayIndex].appointments.forEach(appointmentId => {
      if (!appointments[appointmentId].interview) {
        spotsCount += 1;
      }
    })
    days[dayIndex].spots = spotsCount;

    return axios.delete(`api/appointments/${id}`)
      .then((response) => setState({ ...state, appointments, days }))
  }

  const setDay = day => setState({ ...state, day });
  // console.log(state.interviewers)

  useEffect(() => {
    Promise.all([axios.get('api/days'),
    axios.get('api/appointments'),
    axios.get('api/interviewers')])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
