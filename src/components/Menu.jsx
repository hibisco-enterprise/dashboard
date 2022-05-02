import React from "react";

import homeIcon from "../assets/img/home.svg";
import homeSelectedIcon from "../assets/img/home-selected.svg";
import profileIcon from "../assets/img/profile.svg";
import profileSelectedIcon from "../assets/img/profile-selected.svg";
import faqIcon from "../assets/img/faq.svg";
import faqSelectedIcon from "../assets/img/faq-selected.svg";
import trophyIcon from "../assets/img/trophy.svg";
import trophySelectedIcon from "../assets/img/trophy-selected.svg";
import bellIcon from "../assets/img/bell.svg";
import bellSelectedIcon from "../assets/img/bell-selected.svg";
import gearIcon from "../assets/img/gear.svg";
import logoffIcon from "../assets/img/logoff.svg";

export default function Menu(props) {
    
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
                    <div className="menuOption menuOptionSelected">
                        <img src={homeSelectedIcon} alt="Logoff Icon" />
                        <p>Início</p>
                    </div>
                    <div className="menuOption">
                        <img src={profileIcon} alt="Logoff Icon" />
                        <p>Perfil</p>
                    </div>
                    <div className="menuOption">
                        <img src={faqIcon} alt="Logoff Icon" />
                        <p>FAQ</p>
                    </div>
                    <div className="menuOption">
                        <img src={trophyIcon} alt="Logoff Icon" />
                        <p>Ranking</p>
                    </div>

                    <div className="menuSeparatorLine"/>

                    <div className="menuOption">
                        <img src={bellIcon} alt="Logoff Icon" />
                        <p>Alertas</p>

                    </div>
                    <div className="menuOption">
                        <img src={gearIcon} alt="Logoff Icon" />
                        <p>Configurações</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="menuOption">
                    <img src={logoffIcon} alt="Logoff Icon" />
                    <p>Desconectar</p>
                </div>
            </div>
        </nav>

    )

}