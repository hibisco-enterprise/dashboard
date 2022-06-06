import React, {useState} from "react";

import lockOpen from "../assets/img/lock-open.svg"
import lockClosed from "../assets/img/lock-closed.svg"

export default function TimeLock(props) {

    return(

        <div className="availableTime" onClick={props.eventClick}>
            <span>{props.hour}</span>
            <img src={props.available ? lockOpen : lockClosed} />
        </div>

    )

}