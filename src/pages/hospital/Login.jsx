import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../../components/InicialBar";
import {Input} from "../../components/Input";
import {CardButton} from "../../components/Button";
import Loading from "../../components/Loading";

import {apiKitsune} from "../../apis";

function LoginHospital(){
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
            apiKitsune.post('/hospitals/login', {
                "email": email,
                "password": password
            }).then(res =>{
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    localStorage.setItem("pass", password)
                    navigate("/hospital/requests");
                }else{
                    console.log(res);
                }
            }).catch(err =>{
                if (err.response.status === 404) {
                    alert("Usuário ou senha inválidos!");
                }else{
                    console.error(err);
                }
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
                    <div className="horizontal" style={{marginBottom: '24px'}}>
                        <h1>Entre em sua conta</h1>
                        <h1 onClick={() => navigate("/")} className="backArrow">↩</h1>
                    </div>
                    <Input
                        id="txtEmailLoginHospital"
                        label="Email"
                        placeholder="Digite seu email..."
                        type="email"
                        enabled={true}
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        id="txtPasswordLoginHospital"
                        label="Senha"
                        placeholder="Digite sua senha..."
                        type="password"
                        enabled={true}
                        value={password}
                        setValue={setPassword}
                    />
                    <CardButton label="Entrar" id="btnLoginHospital" eventClick={() => doLogin()}/>
                    <p>Não possui uma conta?</p>
                    <p><a onClick={() =>navigate("/hospital/signup")}>Criar uma conta</a></p>
                </div>
            </div>

            <BottomBar/>
            {loading ? <Loading/> : <></>}
        </>
    );
}

export default LoginHospital;