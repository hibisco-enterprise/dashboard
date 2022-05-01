import React from "react";

function CardButton(props) {
    return(
        <>
            <div className="button cardButton" id={props.id} onClick={props.eventClick}>{props.label}</div>
        </>
    );
}

export default CardButton;