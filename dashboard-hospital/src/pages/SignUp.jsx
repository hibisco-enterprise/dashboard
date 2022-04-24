import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";
import {CardInput, CardSelect} from "../components/Input";
import CardButton from "../components/Button";

import {apiIBGE, apiViaCep} from "../apis";

function SignUp(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [telephone, setTelephone] = useState("");
    const [bloodType, setBloodType] = useState("");

    const [cep, setCEP] = useState("");
    const [uf, setUF] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [adress, setAdress] = useState("");
    const [number, setNumber] = useState("");

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
            console.error(err);
        })

    }, [uf]);

    useEffect(() => {
        apiViaCep.get(`${cep}/json`).then((res) =>{
            setUF(res.data.uf);
            setCity(res.data.localidade);
            setNeighborhood(res.data.bairro);
            setAdress(res.data.logradouro);
        }).catch((err) =>{
            console.error(err);
        })
    }, [cep])

    const stepBalls = document.getElementsByClassName("step");

    function hide(element) {
        element.style.display = "none";
    }
    
    function show(element) {
        element.style.display = "block";
    }
    
    function signUpStep1(){
        stepBalls[0].classList.add("currentStep");
        stepBalls[1].classList.remove("currentStep");
        stepBalls[2].classList.remove("currentStep");
        show(document.getElementById("signUpStep1"));
        hide(document.getElementById("signUpStep2"));
        hide(document.getElementById("signUpStep3"));
    }
    
    function signUpStep2(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.add("currentStep");
        stepBalls[2].classList.remove("currentStep");
        hide(document.getElementById("signUpStep1"));
        show(document.getElementById("signUpStep2"));
        hide(document.getElementById("signUpStep3"));
    }
    
    function signUpStep3(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.remove("currentStep");
        stepBalls[2].classList.add("currentStep");
        hide(document.getElementById("signUpStep1"));
        hide(document.getElementById("signUpStep2"));
        show(document.getElementById("signUpStep3"));
    }

    const navigate = useNavigate();

    return(
        <>
            <TopBar/>

            <div className="container">
                <div className="card">
                    <div className="horizontal" style={{marginBottom: '24px'}}>
                        <h1>Cadastro</h1>
                        <div className="steps">
                            <div className="step currentStep" onClick={() => signUpStep1()}/>
                            <div className="step" onClick={() => signUpStep2()}/>
                            <div className="step" onClick={() => signUpStep3()}/>
                        </div>
                    </div>

                    <div id="signUpStep1">
                        <CardInput
                            id="txtEmailSignUp"
                            label="Email"
                            placeholder="Digite seu email..."
                            type="email"
                            value={email}
                            setValue={setEmail}
                            />
                        <CardInput
                            id="txtPasswordSignUp"
                            label="Senha"
                            placeholder="Digite sua senha..."
                            type="password"
                            value={password}
                            setValue={setPassword}
                            />
                        <CardInput
                            id="txtConfirmPasswordSignUp"
                            label="Confirme sua senha"
                            placeholder="Digite sua senha novamente..."
                            type="password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            />
                        <CardButton label="Próximo" id="btnNextSignUpStep1" eventClick={() => signUpStep2()}/>
                        <p>Já possui uma conta?</p>
                        <p><a onClick={() => navigate("/")}>Entre</a></p>
                    </div>

                    <div id="signUpStep2" style={{display: 'none'}}>
                        <CardInput
                            id="txtNameSignUp"
                            label="Nome"
                            placeholder="Digite seu nome..."
                            type="text"
                            value={name}
                            setValue={setName}
                            />
                        <CardInput
                            id="txtCPFSignUp"
                            label="CPF"
                            placeholder="Digite seu CPF..."
                            type="text"
                            value={cpf}
                            setValue={setCPF}
                            />
                        <CardInput
                            id="txtTelephoneSignUp"
                            label="Telefone"
                            placeholder="Digite seu telefone..."
                            type="tel"
                            value={telephone}
                            setValue={setTelephone}
                            />
                        <div>
                        <CardSelect
                            id="cmbBloodTypeSignUp"
                            label="Tipo Sanguíneo"
                            options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]}
                            value={bloodType}
                            setValue={setBloodType}
                            />
                        </div>
                        <CardButton label="Próximo" id="btnNextSignUpStep2" eventClick={() => signUpStep3()}/>
                    </div>

                    <div id="signUpStep3" style={{display: 'none'}}>
                        <div className="horizontal">
                            <CardInput
                                id="txtCEPSignUp"
                                label="CEP"
                                placeholder="Digite seu CEP..."
                                type="text"
                                value={cep}
                                setValue={setCEP}
                                />
                            <CardSelect
                                id="cmbUFSignUp"
                                label="UF"
                                options={estados.map(estado => (estado.sigla))}
                                value={uf}
                                setValue={setUF}
                                />
                        </div>
                        <CardSelect
                            id="cmbCitySignUp"
                            label="Cidade"
                            options={municipios.map(municipio => (municipio.nome))}
                            value={city}
                            setValue={setCity}
                            />
                        <CardInput
                            id="txtNeighborhoodSignUp"
                            label="Bairro"
                            placeholder="Digite seu bairro..."
                            type="text"
                            value={neighborhood}
                            setValue={setNeighborhood}
                            />
                        <div className="horizontal">
                            <CardInput
                                id="txtAdressSignUp"
                                label="Logradouro"
                                placeholder="Digite seu logradouro..."
                                type="text"
                                value={adress}
                                setValue={setAdress}
                                />
                            <CardInput
                                id="txtNumberSignUp"
                                label="Nº"
                                placeholder="XXX"
                                type="text"
                                value={number}
                                setValue={setNumber}
                                />
                        </div>
                        <CardButton label="Finalizar" id="btnNextSignUpStep3" eventClick={() => signUpStep1()}/>
                    </div>
                </div>
            </div>

            <BottomBar/>
        </>
    );
}

export default SignUp;