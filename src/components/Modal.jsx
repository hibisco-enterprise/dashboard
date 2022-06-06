import React from 'react';
import { useNavigate } from "react-router-dom";
import { IconButton } from './Button';

import { apiKitsune } from '../apis';

import closeIcon from '../assets/img/close.svg';

import mapPin from '../assets/img/map-pin.svg'
import telephone from '../assets/img/telephone.svg'

import lowLevel from "../assets/img/low-level-blood.svg"
import mediumLevel from "../assets/img/medium-level-blood.svg"
import highLevel from "../assets/img/high-level-blood.svg"

import calendar from "../assets/img/calendar.svg"
import download from "../assets/img/download.svg"


export default function Modal(props) {

    const navigate = useNavigate();

    function bloodLevel(percent) {
        if (percent > 80) {
            return highLevel;
        } else if (percent > 35) {
            return mediumLevel;
        } else {
            return lowLevel;
        }
    }

    function redirect(id) {
        sessionStorage.setItem("idHospitalSchedule", id)
        navigate("/donator/schedule");
    }

    function downloadData(id) {
        apiKitsune.get(`/donators/report/${id}`
        ).then(res => {
            if (res.status === 200) {
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:attachment/text,' + encodeURI(res.data);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'hospital.txt';
                hiddenElement.click();
                console.log("Documento baixado.")
            } else {
                console.log(res);
            } 
                
        }).catch(err => {
            console.error(err);
        })
    }

    return(

        <div className="modalBlack">
            <div className="modalContent">
                <div className="modalLocalPhoto">
                    <div className="circularIconButton">
                        <img src={closeIcon} alt="Close icon" onClick={props.closeFunction}/>
                    </div>
                </div>

                <div className="modalText">
                    <h2>{props.name}</h2>
                    <div className="horizontal">
                        <img src={mapPin} alt="" />
                        <p>{props.address}</p>
                    </div>
                    <div className="horizontal">
                        <img src={telephone} alt="" />
                        <p>{props.tel}</p>
                    </div>

                    <div className="bloodCards">
                        {props.bloods.map(blood => (
                            <div className="bloodCard">
                                <img src={bloodLevel(blood.percentage)} alt="" />
                                <div className="bloodLevel">
                                    <h3>{blood.bloodType}</h3>
                                    <h4>{blood.percentage}%</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="horizontal modalButtons">
                        <IconButton
                            id="btnScheduleDonation" 
                            icon={calendar} 
                            label="Agendar Doação"
                            eventClick={() => redirect(props.idHospital)}
                        />
                        <IconButton
                            id="btnDownloadHospitalData" 
                            icon={download} 
                            label="Baixar Dados"
                            eventClick={() => downloadData(props.idHospital)}
                        />
                    </div>
                </div>
            </div>
        </div>

    )

}