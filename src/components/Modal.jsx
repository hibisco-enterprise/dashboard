import React from 'react';

import closeIcon from '../assets/img/close.svg';

import mapPin from '../assets/img/map-pin.svg'
import telephone from '../assets/img/telephone.svg'

import lowLevel from "../assets/img/low-level-blood.svg"
import mediumLevel from "../assets/img/medium-level-blood.svg"
import highLevel from "../assets/img/high-level-blood.svg"


export default function Modal(props) {

    function bloodLevel(percent) {
        if (percent > 80) {
            return highLevel;
        } else if (percent > 35) {
            return mediumLevel;
        } else {
            return lowLevel;
        }
    }

    const bloods = [
        {
          "bloodType": "O-",
          "percentage": 81
        },
        {
          "bloodType": "O+",
          "percentage": 98
        },
        {
          "bloodType": "AB-",
          "percentage": 77
        },
        {
          "bloodType": "AB+",
          "percentage": 57
        },
        {
          "bloodType": "A-",
          "percentage": 28
        },
        {
          "bloodType": "A+",
          "percentage": 41
        },
        {
          "bloodType": "B-",
          "percentage": 28
        },
        {
          "bloodType": "B+",
          "percentage": 41
        }
      ]

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
                        {bloods.map(blood => (
                            <div className="bloodCard">
                                <img src={bloodLevel(blood.percentage)} alt="" />
                                <div className="bloodLevel">
                                    <h3>{blood.bloodType}</h3>
                                    <h4>{blood.percentage}%</h4>
                                </div>
                            </div>
                        ))}
                        {/* <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>AB-</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>A-</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>B-</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>O+</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>AB+</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>A+</h3>
                                <h4>35%</h4>
                            </div>
                        </div>
                        <div className="bloodCard">
                            <img src={bloodLevel(35)} alt="" />
                            <div className="bloodLevel">
                                <h3>B+</h3>
                                <h4>35%</h4>
                            </div>
                        </div>   */}
                    </div>
                </div>
            </div>
        </div>

    )

}