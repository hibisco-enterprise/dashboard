import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";
import {CardInput, CardSelect} from "../components/Input";
import CardButton from "../components/Button";

function SignUp(){

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
        document.getElementById("currentStep").style.order = -1
    }
    
    function signUpStep2(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.add("currentStep");
        stepBalls[2].classList.remove("currentStep");
        hide(document.getElementById("signUpStep1"));
        show(document.getElementById("signUpStep2"));
        hide(document.getElementById("signUpStep3"));
        document.getElementById("currentStep").style.order = 0
    }
    
    function signUpStep3(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.remove("currentStep");
        stepBalls[2].classList.add("currentStep");
        hide(document.getElementById("signUpStep1"));
        hide(document.getElementById("signUpStep2"));
        show(document.getElementById("signUpStep3"));
        document.getElementById("currentStep").style.order = 1
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
                            />
                        <CardInput
                            id="txtPasswordSignUp"
                            label="Senha"
                            placeholder="Digite sua senha..."
                            type="password"
                            />
                        <CardInput
                            id="txtConfirmPasswordSignUp"
                            label="Confirme sua senha"
                            placeholder="Digite sua senha novamente..."
                            type="password"
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
                            />
                        <CardInput
                            id="txtCPFSignUp"
                            label="CPF"
                            placeholder="Digite seu CPF..."
                            type="text"
                            />
                        <CardInput
                            id="txtTelephoneSignUp"
                            label="Telefone"
                            placeholder="Digite seu telefone..."
                            type="tel"
                            />
                        <div>
                        <CardSelect
                            id="cmbBloodTypeSignUp"
                            label="Tipo Sanguíneo"
                            options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]}
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
                                />
                            <CardSelect
                                id="cmbUFSignUp"
                                label="UF"
                                options={[]}
                                // value={a}
                                />
                        </div>
                        <CardSelect
                            id="cmbCitySignUp"
                            label="Cidade"
                            options={[]}
                            />
                        <CardInput
                            id="txtNeighborhoodSignUp"
                            label="Bairro"
                            placeholder="Digite seu bairro..."
                            type="text"
                            />
                        <div className="horizontal">
                            <CardInput
                                id="txtAdressSignUp"
                                label="Logradouro"
                                placeholder="Digite seu logradouro..."
                                type="text"
                                />
                            <CardInput
                                id="txtNumberSignUp"
                                label="Nº"
                                placeholder="XXX"
                                type="text"
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