import React, {useState, useEffect, useLayoutEffect} from "react";
import { MenuHospital } from "../../components/Menu";
import { Input } from "../../components/Input";
import { CardRequest } from "../../components/MiniCard";
import TimeLock from "../../components/TimeLock";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function Requests(props) {
    
    let today = new Date();
    today.setHours(today.getHours() + 3);
    today = today.toISOString().slice(0,10);
    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idHospital": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [date, setDate] = useState();
    const [days, setDays] = useState([]);

    useLayoutEffect(() => {
        apiKitsune.get(`/hospitals/appointment/${user.idHospital}`
        ).then(res => {
            if (res.status === 200) setDays(res.data);
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setDate(today);
        })
    }, [])

    
    return (
        <div className="dashboard">
            <MenuHospital selected="requests" />
            <div className="section">
                <h1>Agendamentos</h1>

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