import React from "react";

function CardButton(props) {
    return(
        <>
            <div className="button cardButton" id={props.id} onClick={props.eventClick}>{props.label}</div>
        </>
    );
}

function IconButton(props) {
    return(
        <>
            <div className="button iconButton" id={props.id} onClick={props.eventClick}>
                <img src={props.icon} alt="Icon" /><p>{props.label}</p>
            </div>
        </>
    );
}

export {CardButton, IconButton};