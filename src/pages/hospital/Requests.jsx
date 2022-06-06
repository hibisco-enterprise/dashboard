import React, {useState, useEffect, useLayoutEffect} from "react";
import { MenuHospital } from "../../components/Menu";
import { CardRequest } from "../../components/MiniCard";
import Loading from "../../components/Loading";

import {apiKitsune} from '../../apis';

export default function Requests(props) {
    
    let today = new Date();
    today.setHours(today.getHours() + 3);
    today = today.toISOString().slice(0,10);
    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idHospital": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [requests, setRequests] = useState([]);

    useLayoutEffect(() => {
        setLoading(true);
        apiKitsune.get(`/hospitals/appointments/${user.idHospital}/not-accepted`
        ).then(res => {
            setRequests(res.data);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])


    function accept(id){
        setLoading(true);
        apiKitsune.post(`/hospitals/appointment/accept/${id}`
        ).then(res => {
            setRequests(requests.filter(request => request.idAppointment !== id));
        }).catch(err => {
            if (err.response.status === 404) {
                setRequests(requests.filter(request => request.idAppointment !== id));
            }
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    function decline(id) {
        setLoading(true);
        apiKitsune.delete(`/hospitals/appointment/${id}`
        ).then(res => {
            setRequests(requests.filter(request => request.idAppointment !== id));
        }).catch(err => {
            if (err.response.status === 404) {
                setRequests(requests.filter(request => request.idAppointment !== id));
            }
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
    }
    
    return (
        <div className="dashboard">
            <MenuHospital selected="requests" />
            <div className="section">
                <h1>Agendamentos</h1>

                <div className="requests">
                    <h2>Solicitações de agendamento</h2>

                    <div className="requests">
                        {requests.map(request => (
                            <CardRequest 
                                name={request.donator.user.name}
                                date={formatDate(request.dhAppointment.slice(0, 10).replace('-','/').replace('-','/')).slice(0, 5)}
                                hour={(request.dhAppointment).slice(11, 16)}
                                acceptFunction={() => accept(request.idAppointment)}
                                declineFunction={() => decline(request.idAppointment)}
                            />
                        ))}
                    </div>
                </div>

            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )

}