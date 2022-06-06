import React, {useState, useEffect} from "react";
import {MenuDonator} from "../../components/Menu";
import ProfileViewer from "../../components/ProfileViewer";
import {Input, Select} from "../../components/Input"
import {IconButton} from "../../components/Button"
import Loading from "../../components/Loading";

import {apiIBGE, apiViaCep, apiKitsune} from '../../apis'

import pencilIcon from "../../assets/img/pencil.svg"
import diskIcon from "../../assets/img/disk.svg"
import trashIcon from "../../assets/img/trash.svg"

export default function Profile() {
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idDonator": null,"bloodType":"","user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    const [editingProfile, setEditingProfile] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);

    const [nameView, setNameView] = useState(user.user.name);
    const [emailView, setEmailView] = useState(user.user.email);
    const [photo, setPhoto] = useState();

    const [name, setName] = useState(user.user.name);
    const [email, setEmail] = useState(user.user.email);
    const [telephone, setTelephone] = useState(user.user.phone);
    const [bloodType, setBloodType] = useState(user.bloodType);

    const [cep, setCEP] = useState(user.user.address.cep);
    const [uf, setUF] = useState(user.user.address.uf);
    const [city, setCity] = useState(user.user.address.city);
    const [neighborhood, setNeighborhood] = useState(user.user.address.neighborhood);
    const [address, setAddress] = useState(user.user.address.address);
    const [number, setNumber] = useState(user.user.address.number);

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


    function editProfile(){
        setEditingProfile(true);
        setTimeout(() => {document.getElementById("txtNameProfile").focus()}, 0)
    }

    function cancelProfile(){
        setName(user.user.name);
        setEmail(user.user.email);
        setTelephone(user.user.phone);
        setBloodType(user.bloodType);

        setEditingProfile(false);
    }

    function saveProfile(){
        const isValid = validateProfile();
        if (isValid) {
            setLoading(true);
            apiKitsune.put(`/donators/${user.idDonator}`, {
                "bloodType": bloodType,
                "user": {
                    "name": name,
                    "email": email,
                    "documentNumber": user.user.documentNumber,
                    "password": localStorage.pass,
                    "phone": telephone,
                    "address": user.user.address
                }
            }).then(res =>{
                if (res.status === 200) {
                    apiKitsune.get(`/donators/${user.idDonator}`).then(res2 =>{
                        localStorage.setItem("user", JSON.stringify(res2.data));
                        setUser(JSON.parse(localStorage.user));
                        setNameView(name);
                        setEmailView(email);
                    }).catch(err =>{
                        console.error(err);
                    })
                    setEditingAddress(false);
                }else{
                    console.log(res);
                }
            }).catch(err =>{
                console.error(err.response);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    function validateProfile(){
        if(email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            //valid email

            if(name.trim() !== ""){
                //valid name
    
                if (telephone.match(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$/)) {
                    //valid telephone
    
                    return true;
                } else {
                    alert("O telefone é inválido! Verifique-o e tente novamente.");
                    return false;
                }
            } else {
                alert("O nome está vazio! Verifique-o e tente novamente.");
                return false;
            }
        } else {
            alert("O email é inválido! Verifique-o e tente novamente.");
            return false;
        }
    }


    function editAddress(){
        setEditingAddress(true);
        setTimeout(() => {document.getElementById("txtCEPProfile").focus()}, 0)
    }

    function cancelAddress(){
        setCEP(user.user.address.cep);
        setUF(user.user.address.uf);
        setCity(user.user.address.city);
        setNeighborhood(user.user.address.neighborhood);
        setAddress(user.user.address.address);
        setNumber(user.user.address.number);

        setEditingAddress(false);
    }

    function saveAddress(){
        const isValid = validateAddress();
        if (isValid) {
            setLoading(true);
            apiKitsune.put(`/donators/address/${user.user.address.idAddress}`, {
                "address": address,
                "neighborhood": neighborhood,
                "city": city,
                "uf": uf,
                "cep": cep,
                "number": number
            }).then(res =>{
                if (res.status === 200) {
                    apiKitsune.get(`/donators/${user.idDonator}`).then(res2 =>{
                        localStorage.setItem("user", JSON.stringify(res2.data));
                        setUser(JSON.parse(localStorage.user));
                    }).catch(err =>{
                        console.error(err);
                    })
                    setEditingAddress(false);
                }else{
                    console.log(res);
                }
            }).catch(err =>{
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    function validateAddress(){
        if(cep.match(/^\d{5}-\d{3}$/) && validCEP){
            //valid cep

            if (number !== "") {
                //number is not empty

                return true;
            } else {
                alert("O número está vazio! Verifique-o e tente novamente.");
                return false;
            }
        } else {
            alert("O CEP é inválido! Verifique-o e tente novamente.");
            return false;
        }
    }


    return(
        <div className="dashboard">
            <MenuDonator selected="profile"/>
            <div className="section">
                <h1>Perfil</h1>
                    <div>
                        <ProfileViewer photo={photo} name={nameView} email={emailView}/>
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
                                    enabled={editingProfile}
                                    value={name}
                                    setValue={setName}
                                />
                                <Input
                                    id="txtEmailProfile"
                                    label="Email"
                                    placeholder="Digite seu email..."
                                    type="email"
                                    enabled={editingProfile}
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
                                    enabled={editingProfile}
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
                                enabled={editingProfile}
                                size="small"
                                value={bloodType}
                                setValue={setBloodType}
                            />
                            <div className="profileButton">
                                {editingProfile ? 
                                    <div className="horizontal">
                                        <IconButton
                                            id="btnCancelProfile" 
                                            icon={trashIcon} 
                                            label="Cancelar"
                                            eventClick={() => cancelProfile()}
                                        />
                                        <IconButton
                                            id="btnSaveProfile" 
                                            icon={diskIcon} 
                                            label="Salvar"
                                            eventClick={() => saveProfile()}
                                        />
                                    </div>
                                : 
                                    <IconButton
                                        id="btnEditProfile" 
                                        icon={pencilIcon} 
                                        label="Editar"
                                        eventClick={() => editProfile()}
                                    />
                                }
                            </div>
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
                                enabled={editingAddress}
                                size="medium"
                                mask="99999-999"
                                maskChar="_"
                                value={cep}
                                setValue={setCEP}
                            />
                            <div className="horizontal">
                                <Select
                                    id="cmbUFProfile"
                                    label="UF"
                                    enabled={false}
                                    size="small"
                                    options={estados.map(estado => (estado.sigla))}
                                    value={uf}
                                    setValue={setUF}
                                />
                                <Select
                                    id="cmbCityProfile"
                                    label="Cidade"
                                    options={(municipios.length === 0) ? ["Selecione primeiro um UF..."] : municipios.map(municipio => (municipio.nome))}
                                    enabled={false}
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
                                    enabled={false}
                                    value={neighborhood}
                                    setValue={setNeighborhood}
                                />
                                <Input
                                    id="txtAddressProfile"
                                    label="Logradouro"
                                    placeholder="Digite seu logradouro..."
                                    type="text"
                                    enabled={false}
                                    value={address}
                                    setValue={setAddress}
                                />
                            </div>
                            <Input
                                id="txtNumberProfile"
                                label="Nº"
                                placeholder="XXX"
                                type="text"
                                enabled={editingAddress}
                                size="small"
                                mask="99999"
                                maskChar=""
                                value={number}
                                setValue={setNumber}
                            />
                            <div className="profileButton">
                                {editingAddress ? 
                                    <div className="horizontal">
                                        <IconButton
                                            id="btnCancelAddress" 
                                            icon={trashIcon} 
                                            label="Cancelar"
                                            eventClick={() => cancelAddress()}
                                        />
                                        <IconButton
                                            id="btnSaveAddress" 
                                            icon={diskIcon} 
                                            label="Salvar"
                                            eventClick={() => saveAddress()}
                                        />
                                    </div>
                                : 
                                    <IconButton
                                        id="btnEditAddress" 
                                        icon={pencilIcon} 
                                        label="Editar"
                                        eventClick={() => editAddress()}
                                    />
                                }
                            </div>
                        </div>
                    </div>                    
            </div>
            {loading ? <Loading/> : <></>}
        </div>
    )
    
}