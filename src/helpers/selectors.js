export function getAppointmentsForDay(state, day) {
  let ids = [];
  const appointments = [];
  for (let item of state.days) {
    if (item.name === day) {
      ids = item.appointments;
    }
  }
  for(let appointment in state.appointments){
     if(ids.includes(Number(appointment))){
    appointments.push(state.appointments[appointment]);
      
     }
  }
  return appointments;
}

export function getInterview(state,interview){
return interview && {...interview,interviewer:state.interviewers[interview.interviewer]}
  }

export function getInterviewersForDay(state,day){
  const dayFound = state.days.find(currentDay=> currentDay.name === day);
  if(!dayFound){
    return [];
  }
const interviewers = dayFound.interviewers.map(interviewerId=> state.interviewers[interviewerId]);
return interviewers;
}
