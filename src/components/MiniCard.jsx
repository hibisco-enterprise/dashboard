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

export {CardDonation};