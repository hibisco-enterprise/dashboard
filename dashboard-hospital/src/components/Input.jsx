import React, {useState} from "react";

function CardInput(props) {

    const [value, setValue] = useState("");

    return(
        <>
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <input id={props.id} placeholder={props.placeholder} type={props.type} onChange={e => setValue(e.target.value)}/>
        </div>
        </>
    );
}

export {CardInput};