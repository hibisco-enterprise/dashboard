import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../components/InicialBar";
import {Input} from "../components/Input";
import {CardButton} from "../components/Button";
import Loading from "../components/Loading";

import {apiKitsune} from "../apis";

function Login(){
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function validateLogin(){
        if(email !== "" || password !== ""){
            //inputs not blank

            if(email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                //valid email
    
                return true;
            } else {
                alert("O email é inválido! Verifique-o e tente novamente.");
                return false;
            }
        } else {
            alert("Algum dos campos está vazio! Verifique-o e tente novamente.");
            return false;
        }
    }

    function doLogin(){
        const isValid = validateLogin();
        if(isValid){
            setLoading(true);
            apiKitsune.post('/donators/login', {
                "email": email,
                "password": password
            }).then((res) =>{
                if (res.status === 200) {
                    navigate("/dog");
                }else{
                    console.log(res);
                }
            }).catch((err) =>{
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return(
        <>
            <TopBar/>

            <div className="container">
                <div className="card">
                    <h1>Entre em sua conta</h1>
                    <Input
                        id="txtEmailLogin"
                        label="Email"
                        placeholder="Digite seu email..."
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        id="txtPasswordLogin"
                        label="Senha"
                        placeholder="Digite sua senha..."
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />
                    <CardButton label="Entrar" id="btnLogin" eventClick={() => doLogin()}/>
                    <p>Não possui uma conta?</p>
                    <p><a onClick={() =>navigate("/signup")}>Criar uma conta</a></p>
                </div>
            </div>

            <BottomBar/>
            {loading ? <Loading/> : <></>}
        </>
    );
}

export default Login;