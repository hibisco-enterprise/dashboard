import React from "react";
import InputMask from "react-input-mask";

function Input(props) {

    return(
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <InputMask className={props.size} mask={props.mask} maskChar={props.maskChar} id={props.id} placeholder={props.placeholder} type={props.type} min={props.min} onChange={e => props.setValue(e.target.value)} value={props.value} disabled={!props.enabled}/>
        </div>
    );
}

function Select(props) {
    return(
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <select className={props.size} id={props.id} onChange={e => props.setValue(e.target.value)} value={props.value} disabled={!props.enabled}>
                {props.options.map((type)=>(
                    <option value={type} key={type}>{type}</option>
                ))}
            </select>
        </div>
    );
}

export {Input, Select};