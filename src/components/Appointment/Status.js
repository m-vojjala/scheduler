import React from "react";
import "../Appointment/styles.scss";

export default function Status(props){
  return <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">{props.messgae}</h1>
</main>
}