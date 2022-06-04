import React from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";

import peopleImg from "../assets/img/people.svg"
import medicineImg from "../assets/img/medicine.svg"

export default function Index() {
    const navigate = useNavigate();

    return(
        
        <>
            <TopBar/>

            <div className="container">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1 id="titleIndex">Como deseja entrar?</h1>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <div className="card cardChoice" onClick={() => navigate("/donator/login")}>
                            <div className="imgIndex">
                                <img src={peopleImg} alt="" />
                            </div>
                            <h2>Cliente</h2>
                            <p>Tenha acesso ao mapa de hemocentros próximos, um histórico das suas últimas doações, e um FAQ sobre a doação de sangue.</p>
                        </div>

                        <div className="card cardChoice redChoice" onClick={() => navigate("hospital/login")}>
                            <div className="imgIndex">
                                <img src={medicineImg} alt="" />
                            </div>
                            <h2>Hospital</h2>
                            <p>Tenha acesso a solicitações de agendamento de clientes, seu estoque de sangue, e um histórico das doações no último ano.</p>
                        </div>
                    </div>
                </div>

            </div>

            <BottomBar/>
        </>

    )

}
