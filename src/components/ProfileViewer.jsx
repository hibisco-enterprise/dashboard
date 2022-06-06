import React from "react";

export default function ProfileViewer(props) {
    
    return (
        <div className="profileViewer">
            <img src={props.photo == undefined ? "https://cdn-icons-png.flaticon.com/512/1080/1080207.png" : props.photo} alt="Profile image" />
            <div>
                <h2>{props.name}</h2>
                <p>{props.email}</p>
            </div>
        </div>
    )

}