import React, {useState, useEffect} from "react";
import { MenuHospital } from "../../components/Menu";
import { Input } from "../../components/Input";
import { CardRequest } from "../../components/MiniCard";
import TimeLock from "../../components/TimeLock";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function Requests(props) {
    
    const today = new Date().toISOString().slice(0,10);
    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idHospital": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [date, setDate] = useState(today);
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        apiKitsune.get(`/hospitals/appointment/${user.idHospital}`
        ).then(res => {
            if (res.status === 200) setDays(res.data);
        }).catch(err => {
            console.error(err);
        })
    }, [])

    return (
        <div className="dashboard">
            <MenuHospital selected="requests" />
            <div className="section">
                <h1>Agendamentos</h1>
                <div style={{marginBottom: '24px'}}>
                    <h2>Verificar disponibilidade de horário por data</h2>
                    <Input 
                        id="dtpDateRequest"
                        label="Data"
                        type="date"
                        enabled={true}
                        value={date}
                        setValue={setDate}
                        min={today}
                    />
                    <div className="availableTimes">
                        
                        {days.map(dayData => {
                            if (new Date(dayData.day).toISOString().slice(0,10) === date) {
                                let day = new Date(date);
                                day.setHours(day.getHours() + 3);
                                day.setHours(8);
                                for (day; day.getHours() < 16; day.setMinutes(day.getMinutes() + 15)) {
                                    console.log(day.toISOString().slice(11, 16) == new Date(dayData.day).toISOString().slice(11, 16));
                                    let array = hours;
                                    array.push({"hour": day.toISOString().slice(11, 16), "available": day.toISOString().slice(11, 16) == new Date(dayData.day).toISOString().slice(11, 16)});
                                    setHours(array);
                                    break;
                                    // if (day.toISOString().slice(11, 16) == new Date(time).toISOString().slice(11, 16)) {
                                        // }
                                        
                                }
                                console.log(hours);
                            }
                        })}
                            {hours.map(card => (
                                <TimeLock 
                                    available={card.available}
                                    hour={card.hour}
                                />

                            ))
                            }
                        {/* <TimeLock 
                            available={true}
                            hour={"08:00"}
                        />
                        <TimeLock 
                            available={false}
                            hour={"08:15"}
                        /> */}
                    </div>
                </div>

                <div className="requests">
                    <h2>Solicitações de agendamento</h2>

                    <CardRequest 
                        photo="https://yt3.ggpht.com/SzBlzEK0LwtKhB0vBc__BfWQY4gchM8W0LfQ-n-McyhpINCKd6pSrlJH0mCLbRLutI_wV16E=s900-c-k-c0x00ffffff-no-rj"
                        name="Cobra Agiota"
                        date="28/05"
                        hour="15:00"
                    />
                </div>

            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )

}