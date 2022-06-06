import React, {useState, useEffect, useLayoutEffect} from "react";
import { MenuDonator } from "../../components/Menu";
import { Input } from "../../components/Input";
import TimeLock from "../../components/TimeLock";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function Requests(props) {
    
    let tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 3);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toISOString().slice(0,10);
    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idDonator": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [date, setDate] = useState();
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);

    useLayoutEffect(() => {
        apiKitsune.get(`/hospitals/appointment/${user.idHospital}`
        ).then(res => {
            if (res.status === 200) setDays(res.data);
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setDate(tomorrow);
        })
    }, [])

    useEffect(() => {
        hoursOfObject();
    }, [date])

    useEffect(() => {
        hoursOfObject();
    }, [hours])

    function existDate() {
        for (let index = 0; index < days.length; index++) {
            const dayData = days[index];
            let dia = new Date(dayData.day);
            dia.setHours(dia.getHours() - 3);
            if (dia.toISOString().slice(0,10) === date) return true;
        }
        return false;
    }

    function hoursOfObject() {

        let horas = [];
        let i = 0;
        if (!existDate()) {
            const dayData = new Date(date)
            let day = new Date(date);
            day.setHours(day.getHours() + 3);
            day.setHours(8);
            day.setHours(day.getHours() - 3);
            for (day; day.getHours() < 13; day.setMinutes(day.getMinutes() + 15)) {
                horas.push({
                    "index": i,
                    "hour": day.toISOString().slice(11, 16), 
                    "available": day.toISOString().slice(11, 16) == new Date(dayData).toISOString().slice(11, 16)
                });    
                i++
            }
            setHours(horas);    
        } else { 
            for (let index = 0; index < days.length; index++) {
                let dayData = days[index];
                // let horas = [];
                if (new Date(dayData.day).toISOString().slice(0,10) === date) {
                    let day = new Date(date);
                    day.setHours(day.getHours() + 3);
                    if (day.toISOString().slice(0,10) === tomorrow) {
                        let hojeAgora = new Date();
                        day.setHours(hojeAgora.getHours());
                        if (hojeAgora.getMinutes() >= 45) {
                            day.setHours(day.getHours() + 1)
                        } else if (hojeAgora.getMinutes() >= 30) {
                            day.setMinutes(45)
                        } else if (hojeAgora.getMinutes() >= 15) {
                            day.setMinutes(30)
                        } else {
                            day.setMinutes(15)
                        }
                    } else {
                        day.setHours(8)
                    }
                    day.setHours(day.getHours() - 3);
                    for (day; day.getHours() < 13; day.setMinutes(day.getMinutes() + 15)) {
                        dayData = days[index]
                        let dia = new Date(dayData.day);
                        dia.setHours(dia.getHours() - 3);
                        if (day.toISOString().slice(11, 16) == dia.toISOString().slice(11, 16)) {
                            horas.push({
                                "index": i,
                                "hour": day.toISOString().slice(11, 16), 
                                "available": true
                            });
                            index++
                        } else {
                            horas.push({
                                "index": i,
                                "hour": day.toISOString().slice(11, 16), 
                                "available": true
                            });
                        }
                        i++;       
                    }
                    setHours(horas);
                    break;
                }
            }
            setHours(horas);
        }
    }

    function agendar(index, hour, can) {
        if (can) {
            apiKitsune.post(`hospitals/appointment/${user.idHospital}`, {
                "days": [
                    `${date} ${hour}:00`
                ]
            }).then(res => {
                if (res.status === 201){
                    let arrayHoras = hours;
                    arrayHoras[index].available = true;
                    setHours(arrayHoras);
                } 
            }).catch(err => {
                console.error(err.response);
            })
        } else {
            alert("Este horário não está disponível, solicite outro.")
        }
    }

    return (
        <div className="dashboard">
            <MenuDonator />
            <div className="section">
                <h1>Agendar doação</h1>
                <div>
                    <h2>Verificar disponibilidade de horário por data</h2>
                    <Input 
                        id="dtpDateSchedule"
                        label="Data"
                        type="date"
                        enabled={true}
                        value={date}
                        setValue={setDate}
                        min={tomorrow}
                    />
                    <div className="availableTimes">
                        
                        {hours.map(hour => (
                            <TimeLock 
                                available={hour.available}
                                hour={hour.hour}
                                eventClick={() => agendar(hour.index, hour.hour, !hour.available)}
                            />  
                        ))}
                    </div>
                </div>

            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )

}