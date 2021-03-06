import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../../components/InicialBar";
import {Input, Select} from "../../components/Input";
import {CardButton} from "../../components/Button";
import Loading from "../../components/Loading";

import {apiIBGE, apiViaCep, apiKitsune} from "../../apis";

function SignUpDonator(){

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [telephone, setTelephone] = useState("");
    const [bloodType, setBloodType] = useState("O+");

    const [cep, setCEP] = useState("");
    const [uf, setUF] = useState("AC");
    const [city, setCity] = useState("Acrelândia");
    const [neighborhood, setNeighborhood] = useState("");
    const [address, setAddress] = useState("");
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
            setMunicipios([]);
            console.error(err);
        })

    }, [uf]);

    const [validCEP, setValidCEP] = useState(false);
    useEffect(() => {
        if(cep !== "" && cep.indexOf('_') < 0){
            apiViaCep.get(`${cep}/json`).then(res =>{
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

    const stepBalls = document.getElementsByClassName("step");
    
    // function signUpStep1(){
    //     stepBalls[0].classList.add("currentStep");
    //     stepBalls[1].classList.remove("currentStep");
    //     stepBalls[2].classList.remove("currentStep");
    //     setStep(1);
    // } resultado 
    
    function signUpStep2(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.add("currentStep");
        stepBalls[2].classList.remove("currentStep");
        setStep(2);
    }
    
    function signUpStep3(){
        stepBalls[0].classList.remove("currentStep");
        stepBalls[1].classList.remove("currentStep");
        stepBalls[2].classList.add("currentStep");
        setStep(3);
    }

    const navigate = useNavigate();

    function validateCPF(strCPF) {
        
        strCPF = strCPF.replaceAll(".", "");
        strCPF = strCPF.replace("-", "");

        var soma;
        var resto;
        soma = 0;
      if (strCPF === "00000000000") return false;
    
      for (var i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11))  resto = 0;
        if (resto !== parseInt(strCPF.substring(9, 10)) ) return false;
    
      soma = 0;
        for (var j = 1; j <= 10; j++) soma = soma + parseInt(strCPF.substring(j-1, j)) * (12 - j);
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11))  resto = 0;
        if (resto !== parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    function validateFirstStep(){
        if(email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            //valid email

            if(password === confirmPassword){
                //passwords match

                var errors = [];
                if (password.length < 8) {
                    errors.push("Sua senha deve conter ao menos 8 caracteres."); 
                }
                if (password.search(/[a-z]/i) < 0) {
                    errors.push("Sua senha deve conter ao menos uma letra.");
                }
                if (password.search(/[0-9]/) < 0) {
                    errors.push("Sua senha deve conter ao menos um número."); 
                }
                if (password.search(/.*[$*&@#]/) < 0) {
                    errors.push("Sua senha deve conter ao menos um caractere especial.");
                } 

                if (errors.length > 0) {
                    alert(errors.join("\n"));
                    return false;
                } else {
                    return true;
                }
            } else {
                alert("Senhas não correspondem! Verifique-a e tente novamente.");
                return false;
            }
        } else {
            alert("O email é inválido! Verifique-o e tente novamente.");
            return false;
        }
    }

    function validateSecondStep(){
        if(name.trim() !== ""){
            //valid name

            if (validateCPF(cpf)) {
                //valid cpf

                if (telephone.match(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$/)) {
                    //valid telephone

                    return true;
                } else {
                    alert("O telefone é inválido! Verifique-o e tente novamente.");
                    return false;
                }
            } else {
                alert("O CPF é inválido! Verifique-o e tente novamente.");
                return false;
            }
        } else {
            alert("O nome está vazio! Verifique-o e tente novamente.");
            return false;
        }
    }

    function validateThirdStep(){
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

    function goToStep2(){
        const isValid = validateFirstStep();
        if(isValid){
            signUpStep2();
        }
    }

    function goToStep3(){
        const isValid = validateSecondStep();
        if(isValid){
            signUpStep3();
        }
    }

    function finishSignUp(){
        const isValid = validateThirdStep();
        if(isValid){
            setLoading(true);

            const obj = {
                "bloodType": bloodType,
                "user": {
                    "email": email,
                    "documentNumber": cpf,
                    "password": password,
                    "name": name,
                    "phone": telephone,
                    "address": {
                        "address": address,
                        "neighborhood": neighborhood,
                        "city": city,
                        "uf": uf,
                        "cep": cep,
                        "number": number
                    }
                }
            }

            apiKitsune.post('/donators/register', obj
            ).then(res =>{
                if (res.status === 201) {
                    navigate("/donator/login");
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

    return(
        <>
            <TopBar/>

            <div className="container">
                <div className="card">
                    <div className="horizontal" style={{marginBottom: '24px'}}>
                        <h1>Cadastro</h1>
                        <div className="steps">
                            <div className="step currentStep"/>
                            <div className="step"/>
                            <div className="step"/>
                        </div>
                    </div>

                    {step === 1 ?

                        <div id="signUpDonatorStep1">
                            <Input
                                id="txtEmailSignUpDonator"
                                label="Email"
                                placeholder="Digite seu email..."
                                type="email"
                                enabled={true}
                                value={email}
                                setValue={setEmail}
                                />
                            <Input
                                id="txtPasswordSignUpDonator"
                                label="Senha"
                                placeholder="Digite sua senha..."
                                type="password"
                                enabled={true}
                                value={password}
                                setValue={setPassword}
                                />
                            <Input
                                id="txtConfirmPasswordSignUpDonator"
                                label="Confirme sua senha"
                                placeholder="Digite sua senha novamente..."
                                type="password"
                                enabled={true}
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                />
                            <CardButton label="Próximo" id="btnNextSignUpDonatorStep1" eventClick={() => goToStep2()}/>
                            <p>Já possui uma conta?</p>
                            <p><a onClick={() => navigate("/donator/login")}>Entre</a></p>
                        </div>

                    : step === 2 ? 

                        <div id="signUpDonatorStep2">
                            <Input
                                id="txtNameSignUpDonator"
                                label="Nome"
                                placeholder="Digite seu nome..."
                                type="text"
                                enabled={true}
                                value={name}
                                setValue={setName}
                                />
                            <Input
                                id="txtCPFSignUpDonator"
                                label="CPF"
                                placeholder="Digite seu CPF..."
                                type="text"
                                enabled={true}
                                mask="999.999.999-99"
                                maskChar="_"
                                value={cpf}
                                setValue={setCPF}
                                />
                            <Input
                                id="txtTelephoneSignUpDonator"
                                label="Telefone"
                                placeholder="Digite seu telefone..."
                                type="tel"
                                enabled={true}
                                mask="(99) \99999-9999"
                                maskChar="_"
                                value={telephone}
                                setValue={setTelephone}
                                />
                            <div>
                            <Select
                                id="cmbBloodTypeSignUpDonator"
                                label="Tipo Sanguíneo"
                                options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]}
                                enabled={true}
                                size="small"
                                value={bloodType}
                                setValue={setBloodType}
                                />
                            </div>
                            <CardButton label="Próximo" id="btnNextSignUpDonatorStep2" eventClick={() => goToStep3()}/>
                        </div>

                    : step === 3 ?

                        <div id="signUpDonatorStep3">
                            <div className="horizontal">
                                <Input
                                    id="txtCEPSignUpDonator"
                                    label="CEP"
                                    placeholder="Digite seu CEP..."
                                    type="text"
                                    enabled={true}
                                    size="medium"
                                    mask="99999-999"
                                    maskChar="_"
                                    value={cep}
                                    setValue={setCEP}
                                    />
                                <Select
                                    id="cmbUFSignUpDonator"
                                    label="UF"
                                    options={estados.map(estado => (estado.sigla))}
                                    enabled={false}
                                    size="small"
                                    value={uf}
                                    setValue={setUF}
                                    />
                            </div>
                            <Select
                                id="cmbCitySignUpDonator"
                                label="Cidade"
                                options={(municipios.length === 0) ? ["Selecione primeiro um UF..."] : municipios.map(municipio => (municipio.nome))}
                                enabled={false}
                                value={(city === "") ? "Selecione primeiro um UF..." : city}
                                setValue={setCity}
                                />
                            <Input
                                id="txtNeighborhoodSignUpDonator"
                                label="Bairro"
                                placeholder="Digite seu bairro..."
                                type="text"
                                enabled={false}
                                value={neighborhood}
                                setValue={setNeighborhood}
                                />
                            <div className="horizontal">
                                <Input
                                    id="txtAddressSignUpDonator"
                                    label="Endereço"
                                    placeholder="Digite seu endereço..."
                                    type="text"
                                    enabled={false}
                                    size="medium"
                                    value={address}
                                    setValue={setAddress}
                                    />
                                <Input
                                    id="txtNumberSignUpDonator"
                                    label="Nº"
                                    placeholder="XXX"
                                    type="text"
                                    enabled={true}
                                    size="small"
                                    mask="99999"
                                    maskChar=""
                                    value={number}
                                    setValue={setNumber}
                                    />
                            </div>
                            <CardButton label="Finalizar" id="btnNextSignUpDonatorStep3" eventClick={() => finishSignUp()}/>
                        </div>

                    : <></>}
                </div>
            </div>

            <BottomBar/>
            {loading ? <Loading/> : <></>}
        </>
    );
}

export default SignUpDonator;