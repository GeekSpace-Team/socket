import React, { useState } from "react";
import AcceptedCallCard from "../../view/accepted-call/AcceptedCallCard";
import "../../style/acceptCall/acceptCall.css";


const AcceptCall = (props) => {
 
  return (
    <div>
      <AcceptedCallCard  setCalls={props.setCalls} calls={props.calls} />
    </div>
  );
};

export default AcceptCall;
