import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

import homeIcon from "../assets/img/home.svg";
import homeSelectedIcon from "../assets/img/home-selected.svg";
import profileIcon from "../assets/img/profile.svg";
import profileSelectedIcon from "../assets/img/profile-selected.svg";
import faqIcon from "../assets/img/faq.svg";
import faqSelectedIcon from "../assets/img/faq-selected.svg";
import bellIcon from "../assets/img/bell.svg";
import bellSelectedIcon from "../assets/img/bell-selected.svg";
import gearIcon from "../assets/img/gear.svg";

import scheduleIcon from "../assets/img/schedule.svg";
import scheduleSelectedIcon from "../assets/img/schedule-selected.svg";
import bloodtypeIcon from "../assets/img/bloodtype.svg";
import bloodtypeSelectedIcon from "../assets/img/bloodtype-selected.svg";
import historyIcon from "../assets/img/history.svg";
import historySelectedIcon from "../assets/img/history-selected.svg";

import logoffIcon from "../assets/img/logoff.svg";

import {apiKitsune} from "../apis";

function MenuDonator(props) {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            alert("Você precisa primeiro se logar!");
            navigate("/login");
        }
    }, []);

    function logoff(){
        setLoading(true);
        if (localStorage.getItem("user") !== null) {
            const idUser = JSON.parse(localStorage.user).user.idUser;
            apiKitsune.delete(`/donators/logoff/${idUser}`
            ).then(res =>{
                if (res.status === 200) {
                    localStorage.removeItem("user");
                    navigate("/donator/login");
                }else{
                    console.log(res);
                }
            }).catch(err =>{
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }
    
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
                    <div className={(props.selected !== "home") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/donator/map")}>
                        <img src={(props.selected !== "home") ? homeIcon : homeSelectedIcon} alt="Home Icon" />
                        <p>Início</p>
                    </div>
                    <div className={(props.selected !== "profile") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/donator/profile")}>
                        <img src={(props.selected !== "profile") ? profileIcon : profileSelectedIcon} alt="Profile Icon" />
                        <p>Perfil</p>
                    </div>
                    <div className={(props.selected !== "history") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/donator/history")}>
                        <img src={(props.selected !== "history") ? historyIcon : historySelectedIcon} alt="History Icon" />
                        <p>Histórico</p>
                    </div>
                    <div className={(props.selected !== "faq") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/donator/faq")}>
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
                <div className="menuOption" onClick={() => logoff()}>
                    <img src={logoffIcon} alt="Logoff Icon" />
                    <p>Desconectar</p>
                </div>
            </div>
            {loading ? <Loading/> : <></>}
        </nav>

    )

}

function MenuHospital(props) {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function logoff(){
        setLoading(true);
        const idUser = JSON.parse(localStorage.user).user.idUser;
        apiKitsune.delete(`/hospital/logoff/${idUser}`
        ).then(res =>{
            if (res.status === 200) {
                localStorage.removeItem("user");
                navigate("/hospital/login");
            }else{
                console.log(res);
            }
        }).catch(err =>{
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }
    
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
                    <div className={(props.selected !== "requests") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/hospital/requests")}>
                        <img src={(props.selected !== "requests") ? scheduleIcon : scheduleSelectedIcon} alt="Requests Icon" />
                        <p>Solicitações</p>
                    </div>
                    <div className={(props.selected !== "stock") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/hospital/stock")}>
                        <img src={(props.selected !== "stock") ? bloodtypeIcon : bloodtypeSelectedIcon} alt="Stock Icon" />
                        <p>Estoque</p>
                    </div>
                    <div className={(props.selected !== "history") ? "menuOption" : "menuOption menuOptionSelected"} onClick={() => navigate("/hospital/history")}>
                        <img src={(props.selected !== "history") ? historyIcon : historySelectedIcon} alt="History Icon" />
                        <p>Histórico</p>
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
                <div className="menuOption" onClick={() => logoff()}>
                    <img src={logoffIcon} alt="Logoff Icon" />
                    <p>Desconectar</p>
                </div>
            </div>
            {loading ? <Loading/> : <></>}
        </nav>

    )

}

export {MenuDonator, MenuHospital}