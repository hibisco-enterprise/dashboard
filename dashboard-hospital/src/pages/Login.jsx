import React from "react";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import CardInput from "../components/CardInput";
import CardButton from "../components/CardButton";

function Login(){
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
                    />
                    <CardInput
                        id="txtPasswordLogin"
                        label="Senha"
                        placeholder="Digite sua senha..."
                    />
                    <CardButton label="Entrar" id="btnLogin"/>
                    <p>Não possui uma conta?</p>
                    <p><a href="">Criar uma conta</a></p>
                </div>
            </div>

            <BottomBar/>
        </>
    );
}

export default Login;