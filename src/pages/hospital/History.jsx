import React from 'react';
import {MenuHospital} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import {CardDonator} from "../../components/MiniCard"

export default function HistoryHospital(props) {

    var object = {
        "donations": [
            {
                "when": "Ontem",
                "donationData": [
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    }
                ]
            },
            {
                "when": "Semana passada",
                "donationData": [
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    }
                ]
            },
            {
                "when": "Esse mês",
                "donationData": [
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    }
                ]
            },
            {
                "when": "Mais tarde",
                "donationData": [
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    },
                    {
                        "photo": "",
                        "name": "Cavalo Relâmpago",
                        "bloodType": "O+",
                        "date": "21/03",
                        "hour": "14:15"
                    }
                ]
            }
        ]
    };

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
                            object.donations.map(filtro => (
                                <>
                                    <h3>{filtro.when}</h3>
                                    <div className="historyCards">
                                        {
                                            filtro.donationData.map(donation => (
                                                <CardDonator 
                                                    photo={"data:image/jpeg;base64,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"}
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
        </div>
    )

}
