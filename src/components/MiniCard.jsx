import React from 'react';

function CardDonation(props){

    return (
        <div className="minicard">
            <div>
                <p>{props.date}<br/>
                {props.hour}</p>
            </div>
            <div>
                <h4>{props.locale}</h4>
            </div>
        </div>
    );

}

function CardDonator(props){

    return (
        <div className="minicard">
            <div style={{display: 'flex'}}>
                <img src={props.photo} alt="Donator Photo" />
                <div>
                    <h4>{props.name}</h4>
                    <span>{props.bloodType}</span>
                </div>
            </div>
            <div>
                <p>{props.date}<br/>
                {props.hour}</p>
            </div>
        </div>
    );

}

export {CardDonation, CardDonator};