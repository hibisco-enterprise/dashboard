import React from "react";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/img/home.svg";
import homeSelectedIcon from "../assets/img/home-selected.svg";
import profileIcon from "../assets/img/profile.svg";
import profileSelectedIcon from "../assets/img/profile-selected.svg";
import faqIcon from "../assets/img/faq.svg";
import faqSelectedIcon from "../assets/img/faq-selected.svg";
// import trophyIcon from "../assets/img/trophy.svg";
// import trophySelectedIcon from "../assets/img/trophy-selected.svg";
import bellIcon from "../assets/img/bell.svg";
import bellSelectedIcon from "../assets/img/bell-selected.svg";
import gearIcon from "../assets/img/gear.svg";
import logoffIcon from "../assets/img/logoff.svg";

function MenuDonator(props) {

    const navigate = useNavigate();
    
    return(

        <nav className="menu">
            <div>
                <div className="horizontal">
                    <b className="title">kitsune</b>
                    <div className="sandwich">
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
                <div style={{marginTop:'36px'}}>
                    <div className={(props.selected !== "home") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/")}>
                        <img src={(props.selected !== "home") ? homeIcon : homeSelectedIcon} alt="Home Icon" />
                        <p>Início</p>
                    </div>
                    <div className={(props.selected !== "profile") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/profile")}>
                        <img src={(props.selected !== "profile") ? profileIcon : profileSelectedIcon} alt="Profile Icon" />
                        <p>Perfil</p>
                    </div>
                    <div className={(props.selected !== "faq") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/faq")}>
                        <img src={(props.selected !== "faq") ? faqIcon : faqSelectedIcon} alt="FAQ Icon" />
                        <p>FAQ</p>
                    </div>

                    <div className="menuSeparatorLine"/>

                    <div className={(props.selected !== "alert") ? "menuOption" : "menuOption menuOptionSelected"}>
                        <img src={(props.selected !== "alert") ? bellIcon : bellSelectedIcon} alt="Alert Icon" />
                        <p>Alertas</p>

                    </div>
                    <div className={(props.selected !== "config") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/donator/config")}>
                        <img src={(props.selected !== "config") ? gearIcon : homeSelectedIcon} alt="Configs Icon" />
                        <p>Configurações</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="menuOption" onClick={() => navigate("/login")}>
                    <img src={logoffIcon} alt="Logoff Icon" />
                    <p>Desconectar</p>
                </div>
            </div>
        </nav>

    )

}

function MenuHospital(props) {

    const navigate = useNavigate();
    
    return(

        <nav className="menu">
            <div>
                <div className="horizontal">
                    <b className="title">kitsune</b>
                    <div className="sandwich">
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
                <div style={{marginTop:'36px'}}>
                    <div className={(props.selected !== "requests") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/requests")}>
                        <img src={(props.selected !== "requests") ? homeIcon : homeSelectedIcon} alt="Requests Icon" />
                        <p>Início</p>
                    </div>
                    <div className={(props.selected !== "stock") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/stock")}>
                        <img src={(props.selected !== "stock") ? profileIcon : profileSelectedIcon} alt="Stock Icon" />
                        <p>Perfil</p>
                    </div>
                    <div className={(props.selected !== "history") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/history")}>
                        <img src={(props.selected !== "history") ? faqIcon : faqSelectedIcon} alt="History Icon" />
                        <p>FAQ</p>
                    </div>

                    <div className="menuSeparatorLine"/>

                    <div className={(props.selected !== "alert") ? "menuOption" : "menuOption menuOptionSelected"}>
                        <img src={(props.selected !== "alert") ? bellIcon : bellSelectedIcon} alt="Alert Icon" />
                        <p>Alertas</p>

                    </div>
                    <div className={(props.selected !== "config") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/hospital/config")}>
                        <img src={(props.selected !== "config") ? gearIcon : homeSelectedIcon} alt="Configs Icon" />
                        <p>Configurações</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="menuOption" onClick={() => navigate("/login")}>
                    <img src={logoffIcon} alt="Logoff Icon" />
                    <p>Desconectar</p>
                </div>
            </div>
        </nav>

    )

}

export {MenuDonator}