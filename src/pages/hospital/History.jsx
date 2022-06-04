import React, {useState, useEffect} from 'react';
import {MenuHospital} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import {CardDonator} from "../../components/MiniCard";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function HistoryHospital(props) {

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idHospital": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [history, setHistory] = useState({});

    return(
        <div className="dashboard">
            <MenuHospital selected="history"/>
            <div className="section">
                <h1>Histórico</h1>
                <div style={{marginBottom: '32px'}}>
                    <h2>Análise do número de doações no último ano</h2>
                    <StyledChart data={
                        [
                            ["Meses Atrás", "Quantidade"], 
                            [12, 900], [11, 404], [10, 293], [9, 662], [8, 885], [7, 908], [6, 987], [5, 359], [4, 931], [3, 111], [2, 697], [1, 905], [0, 278]]
                        } 
                        height={256}/>
                </div>

                <div style={{marginTop: '64px'}}>
                    <h2>Últimas doações</h2>
                    <div className="historyDonation">
                        {
                            history.donations.map(filtro => (
                                <>
                                    <h3>{filtro.when}</h3>
                                    <div className="queueDiv">
                                        {
                                            filtro.donationData.map(donation => (
                                                <CardDonator 
                                                    photo={"https://play-lh.googleusercontent.com/yivGwVSdcGiBJgMVCUfub3qNXSkjnhTgNpUlwmJDt7QC5DFF97c-Q81r4kruNHwi_QA=s256-rw"}
                                                    name={donation.name}
                                                    bloodType={donation.bloodType}
                                                    date={donation.date}
                                                    hour={donation.hour}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
                                     
            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )

}
