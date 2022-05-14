import React, {useState, useEffect} from "react";
import {MenuDonator} from "../../components/Menu";
import ProfileViewer from "../../components/ProfileViewer";
import {Input, Select} from "../../components/Input"
import {IconButton} from "../../components/Button"

import {apiIBGE, apiViaCep} from '../../apis'

import pencilIcon from "../../assets/img/pencil.svg"

export default function Profile() {

    const [name, setName] = useState("Macaco Maluco");
    const [email, setEmail] = useState("macaco@gmail.com");
    const [telephone, setTelephone] = useState("11981582705");
    const [bloodType, setBloodType] = useState("O+");

    const [cep, setCEP] = useState("02188080");
    const [uf, setUF] = useState("SP");
    const [city, setCity] = useState("São Paulo");
    const [neighborhood, setNeighborhood] = useState("Parque Novo Mundo");
    const [address, setAddress] = useState("Rua Soldado Brasílio Pinto de Almeida");
    const [number, setNumber] = useState("102");

    const [estados, setEstados] = useState([]);
    useEffect(() => {

        // console.log(apiIBGE);

        apiIBGE.get('?orderBy=nome').then((res) =>{
            setEstados(res.data);
        }).catch((err) =>{
            console.error(err);
        })

    }, []);

    const [municipios, setMunicipios] = useState([]);
    useEffect(() => {
        apiIBGE.get(`${uf}/municipios?orderBy=nome`).then((res) =>{
            setMunicipios(res.data);
        }).catch((err) =>{
            setMunicipios([]);
            console.error(err);
        })

    }, [uf]);

    const [validCEP, setValidCEP] = useState(false);
    useEffect(() => {
        if(cep !== "" && cep.indexOf('_') < 0){
            apiViaCep.get(`${cep}/json`).then((res) =>{
                if(res.data.erro){
                    setValidCEP(false);
                    setUF("");
                    setCity("");
                    setNeighborhood("");
                    setAddress("");
                } else {
                    setValidCEP(true);
                    setUF(res.data.uf);
                    setCity(res.data.localidade);
                    setNeighborhood(res.data.bairro);
                    setAddress(res.data.logradouro);
                }
            }).catch((err) =>{
                console.error(err);
            })
        }
    }, [cep])

    return(
        <div className="dashboard">
            <MenuDonator selected="profile"/>
            <div className="section">
                <h1>Perfil</h1>
                    <div>
                        <ProfileViewer photo="https://c-fa.cdn.smule.com/rs-s53/arr/c9/14/da9882b3-c024-4a6f-bb94-f7efcb3e05c7_256.jpg" name="Macaco Maluco" email="macaco@gmail.com"/>
                    </div>
                    <div style={{marginBottom: '32px'}}>
                        <h2>Dados</h2>
                        <div className="profileData">
                            <div className="horizontal">
                                <Input 
                                    id="txtNameProfile"
                                    label="Nome"
                                    placeholder="Digite seu nome..."
                                    type="text"
                                    value={name}
                                    setValue={setName}
                                />
                                <Input
                                    id="txtEmailProfile"
                                    label="Email"
                                    placeholder="Digite seu email..."
                                    type="email"
                                    value={email}
                                    setValue={setEmail}
                                />
                            </div>
                            <div className="horizontal">
                                <Input 
                                    id="txtTelephoneProfile"
                                    label="Telefone"
                                    placeholder="Digite seu telefone..."
                                    type="tel"
                                    value={telephone}
                                    setValue={setTelephone}
                                    mask="(99) \99999-9999"
                                    maskChar="_"
                                />
                            </div>
                            <Select
                                id="cmbBloodTypeProfile"
                                label="Tipo Sanguíneo"
                                options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]}
                                value={bloodType}
                                setValue={setBloodType}
                            />
                            <IconButton
                                id="btnEditProfile" 
                                icon={pencilIcon} 
                                label="Editar"
                            />
                        </div>
                    </div>

                    <div>
                        <h2>Endereço</h2>
                        <div className="profileData">
                            <Input
                                id="txtCEPProfile"
                                label="CEP"
                                placeholder="Digite seu CEP..."
                                type="text"
                                mask="99999-999"
                                maskChar="_"
                                value={cep}
                                setValue={setCEP}
                            />
                            <div className="horizontal">
                                <Select
                                    id="cmbUFProfile"
                                    label="UF"
                                    options={estados.map(estado => (estado.sigla))}
                                    value={uf}
                                    setValue={setUF}
                                />
                                <Select
                                    id="cmbCityProfile"
                                    label="Cidade"
                                    options={(municipios.length === 0) ? ["Selecione primeiro um UF..."] : municipios.map(municipio => (municipio.nome))}
                                    value={(city === "") ? "Selecione primeiro um UF..." : city}
                                    setValue={setCity}
                                />
                            </div>
                            <div className="horizontal">
                                <Input
                                    id="txtNeighborhoodProfile"
                                    label="Bairro"
                                    placeholder="Digite seu bairro..."
                                    type="text"
                                    value={neighborhood}
                                    setValue={setNeighborhood}
                                />
                                <Input
                                    id="txtAddressProfile"
                                    label="Logradouro"
                                    placeholder="Digite seu logradouro..."
                                    type="text"
                                    value={address}
                                    setValue={setAddress}
                                />
                            </div>
                            <Input
                                id="txtNumberSignUp"
                                label="Nº"
                                placeholder="XXX"
                                type="text"
                                mask="99999"
                                maskChar=""
                                value={number}
                                setValue={setNumber}
                            />
                            <IconButton
                                id="btnEditProfile" 
                                icon={pencilIcon} 
                                label="Editar"
                            />
                        </div>
                    </div>                    
            </div>
        </div>
    )
    
}