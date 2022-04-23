import React from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";
import {CardInput} from "../components/Input";
import CardButton from "../components/Button";

function Login(){

    const navigate = useNavigate();

    return(
        <>
            <TopBar/>

            <div className="container">
                <div className="card">
                    <h1>Entre em sua conta</h1>
                    <CardInput
                        id="txtEmailLogin"
                        label="Email"
                        placeholder="Digite seu email..."
                        type="email"
                    />
                    <CardInput
                        id="txtPasswordLogin"
                        label="Senha"
                        placeholder="Digite sua senha..."
                        type="password"
                    />
                    <CardButton label="Entrar" id="btnLogin"/>
                    <p>Não possui uma conta?</p>
                    <p><a onClick={() =>navigate("/signup")}>Criar uma conta</a></p>
                </div>
            </div>

            <BottomBar/>
        </>
    );
}

export default Login;