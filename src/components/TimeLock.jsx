import React from "react";

import lockOpen from "../assets/img/lock-open.svg"
import lockClosed from "../assets/img/lock-closed.svg"

export default function TimeLock(props) {

    return(

        <div className="availableTime">
            <img src={props.available ? lockOpen : lockClosed} />
            <span>{props.hour}</span>
        </div>

    )

}