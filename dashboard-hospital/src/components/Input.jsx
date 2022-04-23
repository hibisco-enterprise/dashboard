import React from "react";

function CardInput(props) {
    return(
        <>
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <input id={props.id} placeholder={props.placeholder}/>
        </div>
        </>
    );
}

export default CardInput;