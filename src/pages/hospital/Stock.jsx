import React, {useState, useEffect} from 'react';
import {MenuHospital} from "../../components/Menu";
import StyledChart from "../../components/StyledCharts";
import StyledSlider from "../../components/StyledSlider"
import {IconButton} from "../../components/Button";
import Loading from "../../components/Loading";

import bloodONIcon from "../../assets/img/blood-o-n.svg"
import bloodOPIcon from "../../assets/img/blood-o-p.svg"
import bloodABNIcon from "../../assets/img/blood-ab-n.svg"
import bloodABPIcon from "../../assets/img/blood-ab-p.svg"
import bloodANIcon from "../../assets/img/blood-a-n.svg"
import bloodAPIcon from "../../assets/img/blood-a-p.svg"
import bloodBNIcon from "../../assets/img/blood-b-n.svg"
import bloodBPIcon from "../../assets/img/blood-b-p.svg"

import pencilIcon from "../../assets/img/pencil.svg"
import diskIcon from "../../assets/img/disk.svg"
import trashIcon from "../../assets/img/trash.svg"

import { apiKitsune } from '../../apis';


export default function Stock(props) {
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idHospital": null,"user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [editing, setEditing] = useState(false);

    const [bloodON, setBloodON] = useState(0);
    const [bloodOP, setBloodOP] = useState(0);
    const [bloodABN, setBloodABN] = useState(0);
    const [bloodABP, setBloodABP] = useState(0);
    const [bloodAN, setBloodAN] = useState(0);
    const [bloodAP, setBloodAP] = useState(0);
    const [bloodBN, setBloodBN] = useState(0);
    const [bloodBP, setBloodBP] = useState(0);

    useEffect(() => {
        apiKitsune.get(`/hospitals/blood/${user.idHospital}`
        ).then(res => {
            if (res.status === 200) {
                let responseData = res.data;
                setBloodON(responseData[0].percentage);
                setBloodOP(responseData[1].percentage);
                setBloodABN(responseData[2].percentage);
                setBloodABP(responseData[3].percentage);
                setBloodAN(responseData[4].percentage);
                setBloodAP(responseData[5].percentage);
                setBloodBN(responseData[6].percentage);
                setBloodBP(responseData[7].percentage);
            }
        }).catch(err => {
            console.error(err);
        })
    }, []);

    function editStock(){
        setEditing(true);
    }

    function cancelStock(){
        setEditing(false);
    }

    function saveStock(){
        setLoading(true);
            apiKitsune.put(`/hospitals/blood/${user.idHospital}`, [
                {
                    "bloodType": "O-",
                    "percentage": bloodON
                },
                {
                    "bloodType": "O+",
                    "percentage": bloodOP
                },
                {
                    "bloodType": "AB-",
                    "percentage": bloodABN
                },
                {
                    "bloodType": "AB+",
                    "percentage": bloodABP
                },
                {
                    "bloodType": "A-",
                    "percentage": bloodAN
                },
                {
                    "bloodType": "A+",
                    "percentage": bloodAP
                },
                {
                    "bloodType": "B-",
                    "percentage": bloodAN
                },
                {
                    "bloodType": "B+",
                    "percentage": bloodAP
                }
            ]).then(res =>{
                if (res.status === 200) {
                    
                    setEditing(false);
                }else{
                    console.log(res);
                }
            }).catch(err =>{
                console.error(err.response);
            }).finally(() => {
                setLoading(false);
            })
    }

    return(
        <div className="dashboard">
            <MenuHospital selected="stock" />
            <div className="section">
                <h1>Estoque de sangue</h1>
                <div className="bloodStock">
                    <div className="queueDiv">
                        <StyledSlider image={bloodONIcon} enabled={editing} value={bloodON} setValue={setBloodON} />
                        <StyledSlider image={bloodOPIcon} enabled={editing} value={bloodOP} setValue={setBloodOP} />
                        <StyledSlider image={bloodABNIcon} enabled={editing} value={bloodABN} setValue={setBloodABN} />
                        <StyledSlider image={bloodABPIcon} enabled={editing} value={bloodABP} setValue={setBloodABP} />
                        <StyledSlider image={bloodANIcon} enabled={editing} value={bloodAN} setValue={setBloodAN} />
                        <StyledSlider image={bloodAPIcon} enabled={editing} value={bloodAP} setValue={setBloodAP} />
                        <StyledSlider image={bloodBNIcon} enabled={editing} value={bloodBN} setValue={setBloodBN} />
                        <StyledSlider image={bloodBPIcon} enabled={editing} value={bloodBP} setValue={setBloodBP} />
                    </div>
                    <div className="profileButton" style={{marginRight: '50px'}}>
                        {editing ? 
                            <div className="horizontal">
                                <IconButton
                                    id="btnCancelStock" 
                                    icon={trashIcon} 
                                    label="Cancelar"
                                    eventClick={() => cancelStock()}
                                />
                                <IconButton
                                    id="btnSaveStock" 
                                    icon={diskIcon} 
                                    label="Salvar"
                                    eventClick={() => saveStock()}
                                />
                            </div>
                            : 
                            <IconButton
                                id="btnEditStock" 
                                icon={pencilIcon} 
                                label="Editar"
                                eventClick={() => editStock()}
                            />
                        }
                    </div>
                </div>
            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )

}