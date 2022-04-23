import React from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";
import {CardInput} from "../components/Input";
import CardButton from "../components/Button";

function SignUp(){

    const navigate = useNavigate();

    return(
        <>
            <TopBar/>

            <div className="container">
                <div className="card">
                    <div className="horizontal">
                        <h1>Cadastro</h1>
                        <div className="steps">
                            <div className="step currentStep"/>
                            <div className="step"/>
                            <div className="step"/>
                        </div>
                    </div>
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
                    <CardButton label="Próximo" id="btnNextSignUpStep1"/>
                    <p>Já possui uma conta?</p>
                    <p><a onClick={() => navigate("/")}>Entre</a></p>
                </div>
            </div>

            <BottomBar/>
        </>
    );
}

export default SignUp;