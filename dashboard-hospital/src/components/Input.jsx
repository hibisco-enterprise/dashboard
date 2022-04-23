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

function CardSelect(props) {

    const [value, setValue] = useState("");

    return(
        <>
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <select id={props.id} onChange={e => setValue(e.target.value)} value={props.value}>
                {props.options.map((type)=>(
                    <option value={type}>{type}</option>
                ))}
            </select>
        </div>
        </>
    );
}

export {CardInput, CardSelect};