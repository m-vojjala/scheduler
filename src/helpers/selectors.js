
export  default function getAppointmentsForDay(state, day) {
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