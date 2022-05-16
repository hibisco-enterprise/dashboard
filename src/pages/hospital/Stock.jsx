import React, {useState} from 'react';
import {MenuHospital} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import StyledSlider from "../../components/StyledSlider"
import {IconButton} from "../../components/Button"

import bloodON from "../../assets/img/blood-o-n.svg"
import bloodOP from "../../assets/img/blood-o-p.svg"
import bloodABN from "../../assets/img/blood-ab-n.svg"
import bloodABP from "../../assets/img/blood-ab-p.svg"
import bloodAN from "../../assets/img/blood-a-n.svg"
import bloodAP from "../../assets/img/blood-a-p.svg"
import bloodBN from "../../assets/img/blood-b-n.svg"
import bloodBP from "../../assets/img/blood-b-p.svg"

import pencilIcon from "../../assets/img/pencil.svg"


export default function Stock(props) {

    const [editing, setEditing] = useState(false);

    return(
        <div className="dashboard">
            <MenuHospital selected="stock" />
            <div className="section">
                <h1>Estoque de sangue</h1>
                <div className="bloodStock">
                    <div className="queueDiv">
                        <StyledSlider image={bloodON} enabled={editing} />
                        <StyledSlider image={bloodOP} enabled={editing} />
                        <StyledSlider image={bloodABN} enabled={editing} />
                        <StyledSlider image={bloodABP} enabled={editing} />
                        <StyledSlider image={bloodAN} enabled={editing} />
                        <StyledSlider image={bloodAP} enabled={editing} />
                        <StyledSlider image={bloodBN} enabled={editing} />
                        <StyledSlider image={bloodBP} enabled={editing} />
                    </div>
                    <IconButton
                        id="btnEditProfile" 
                        icon={pencilIcon} 
                        label="Editar"
                        eventClick={() => setEditing(!editing)}
                    />
                </div>
            </div>
        </div>
    )

}