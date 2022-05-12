import React, {useState} from "react";

import chevron from "../assets/img/chevron.svg"

export default function Question(props) {

    const [opened, setOpened] = useState(false);
    
    return(
        <div className={`question ${opened ? "questionOpened" : ""}`}>
            <div className="horizontal" onClick={() => setOpened(!opened)}>
                <h3>{props.question}</h3>
                <img src={chevron} alt="Chevron" />
            </div>
            <p>{props.explanation}</p>
        </div>
    )

}