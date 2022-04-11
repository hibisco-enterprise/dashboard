import React from "react";

function CardButton(props) {
    return(
        <>
            <div className="button" id={props.id}>{props.label}</div>
        </>
    );
}

export default CardButton;