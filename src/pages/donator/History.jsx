import React, {useState, useEffect} from "react";
import {MenuDonator} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import {CardDonation} from "../../components/MiniCard"

export default function HistoryDonator() {

    var object = {
        "donations": [
            {
                "year": 2022,
                "donationData": [
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                ]
            },
            {
                "year": 2021,
                "donationData": [
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                    {
                        "date": "21/03",
                        "hour": "14:15",
                        "locale": "Fundação Pró-Sangue Hemocentro São Paulo"
                    },
                ]
            }
        ]
    };

    return(
        <div className="dashboard">
            <MenuDonator selected="history"/>
            <div className="section">
                <h1>Histórico</h1>
                <div style={{marginBottom: '32px'}}>
                    <h2>Análise das suas últimas doações</h2>
                    <StyledChart data={[["Ano", "Quantidade"], [2018, 3], [2019, 4], [2020, 0], [2021, 2], [2022, 4]]} height={256}/>
                </div>

                <div style={{marginTop: '64px'}}>
                    <h2>Últimas doações</h2>
                    <div className="historyDonation">
                        {
                            object.donations.map(filtro => (
                                <>
                                    <h3>{filtro.year}</h3>
                                    <div className="historyCards">
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
                        <CardDonation date="22/01" hour="13:30" locale="Fundação Pró-Sangue Hemocentro São Paulo"/>
                    </div>
                </div>
                                     
            </div>
        </div>
    )
    
}