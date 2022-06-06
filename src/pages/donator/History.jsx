import React, {useState, useEffect} from "react";
import {MenuDonator} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import {CardDonation} from "../../components/MiniCard";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function HistoryDonator() {

    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idDonator": null,"bloodType":"","user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    useEffect(() => {
        setLoading(true);
        apiKitsune.get(`/donators/appointment/${user.idDonator}/accepted`
        ).then(res => {
            setHistory(res.data);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    let appointments = [];
    function beautifyHistory(){
        for (let index = 0; index < history.length; index++) {
            const element = history[index];
            if (index == 0) {
                appointments.push({
                    "year": element.dhAppointment.slice(0, 4),
                    "donationData": [
                        {
                            "date": formatDate(element.dhAppointment.slice(0, 10).replace('-','/').replace('-','/')).slice(0, 5),
                            "hour": element.dhAppointment.slice(11, 16),
                            "locale": element.hospital.user.name
                        }
                    ]
                })
            } else {
                if (new Date(history[index]).getFullYear() != new Date(history[index - 1]).getFullYear()) {
                    appointments.push({
                        "year": element.dhAppointment.slice(0, 4),
                        "donationData": [
                            {
                                "date": formatDate(element.dhAppointment.slice(0, 10).replace('-','/').replace('-','/')).slice(0, 5),
                                "hour": element.dhAppointment.slice(11, 16),
                                "locale": element.hospital.user.name
                            }
                        ]
                    })
                } else {
                    appointments[appointments.length - 1].donationData.push({
                        "date": formatDate(element.dhAppointment.slice(0, 10).replace('-','/').replace('-','/')).slice(0, 5),
                        "hour": element.dhAppointment.slice(11, 16),
                        "locale": element.hospital.user.name
                    })
                }

            }

        }
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
    }

    function arrayDonations() {
        let array = [["Ano", "Quantidade"]];
        for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            array.push([parseInt(element.year), Array.from(element.donationData).length])
        }
        if (array.length < 6) {
            let lastYear = parseInt(array[array.length - 1][0]);
            const diferenca = 6 - array.length;
            for (let index = 0; index < diferenca; index++) {
                array.push([--lastYear, 0])
            }
        }
        return array;
    }

    return(
        <div className="dashboard">
            <MenuDonator selected="history"/>
            <div className="section">
                <h1>Histórico</h1>
                {beautifyHistory()} 
                <div style={{marginBottom: '32px'}}>
                    <h2>Análise das suas últimas doações</h2>
                    <StyledChart data={arrayDonations()} height={256}/>
                </div>

                <div style={{marginTop: '64px'}}>
                    <h2>Últimas doações</h2>
                    <div className="historyDonation">
                        {
                            appointments.map(filtro => (
                                <>
                                    <h3>{filtro.year}</h3>
                                    <div className="queueDiv">
                                        {
                                            filtro.donationData.map(donation => (
                                                <CardDonation 
                                                    date={donation.date}
                                                    hour={donation.hour}
                                                    locale={donation.locale}
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