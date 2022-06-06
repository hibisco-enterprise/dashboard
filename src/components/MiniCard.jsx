import React from 'react';

import acceptIcon from "../assets/img/accept-icon.svg";
import declineIcon from "../assets/img/decline-icon.svg";

function CardDonation(props){

    return (
        <div className="minicard" style={{justifyContent: 'flex-start'}}>
            <div>
                <p>{props.date}<br/>
                {props.hour}</p>
            </div>
            <div style={{marginLeft: '24px'}}>
                <h4>{props.locale}</h4>
            </div>
        </div>
    );

}

function CardDonator(props){

    return (
        <div className="minicard">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={props.photo == undefined ? "https://cdn-icons-png.flaticon.com/512/1080/1080207.png" : props.photo} alt="Donator Photo" />
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

function CardRequest(props) {
    return (
        <div className="minicard">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={props.photo == undefined ? "https://cdn-icons-png.flaticon.com/512/1080/1080207.png" : props.photo} alt="Donator Photo" />
                <div>
                    <h4>{props.name}</h4>
                    <span>{props.date} - {props.hour}</span>
                </div>
            </div>
            <div>
                <div className="horizontal">
                    <div className="circularIconButton" onClick={props.acceptFunction}><img src={acceptIcon} alt="Accept Icon" /></div>
                    <div className="circularIconButton" onClick={props.declineFunction}><img src={declineIcon} alt="Decline Icon" /></div>
                </div>
            </div>
        </div>
    )
}

export {CardDonation, CardDonator, CardRequest};