import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TopBar, BottomBar} from "../../components/InicialBar";
import {Input, Select} from "../../components/Input";
import {CardButton} from "../../components/Button";
import Loading from "../../components/Loading";

import {apiIBGE, apiViaCep, apiKitsune} from "../../apis";

function SignUpHospital(){

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [name, setName] = useState("");
    const [cnpj, setCNPJ] = useState("");
    const [telephone, setTelephone] = useState("");

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

    function validateCNPJ(strCNPJ) {
        
        strCNPJ = strCNPJ.replace(/[^\d]+/g,'');
 
        if(strCNPJ == '') return false;
        
        if (strCNPJ.length != 14)
            return false;
    
        // Elimina CNPJs invalidos conhecidos
        if (strCNPJ == "00000000000000" || 
            strCNPJ == "11111111111111" || 
            strCNPJ == "22222222222222" || 
            strCNPJ == "33333333333333" || 
            strCNPJ == "44444444444444" || 
            strCNPJ == "55555555555555" || 
            strCNPJ == "66666666666666" || 
            strCNPJ == "77777777777777" || 
            strCNPJ == "88888888888888" || 
            strCNPJ == "99999999999999")
            return false;
           
        var tamanho, numeros, digitos, soma, pos, resultado;
        
        // Valida DVs
        tamanho = strCNPJ.length - 2
        numeros = strCNPJ.substring(0,tamanho);
        digitos = strCNPJ.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
            
        tamanho = tamanho + 1;
        numeros = strCNPJ.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
            
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

            if (validateCNPJ(cnpj)) {
                //valid cnpj

                if (telephone.match(/\(\d{2}\)\s\d{4,5}\-\d{4}$/)) {
                    //valid telephone

                    return true;
                } else {
                    alert("O telefone é inválido! Verifique-o e tente novamente.");
                    return false;
                }
            } else {
                alert("O CNPJ é inválido! Verifique-o e tente novamente.");
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
                "user": {
                    "email": email,
                    "documentNumber": cnpj,
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

            console.log(obj);

            apiKitsune.post('/hospitals/register', obj
            ).then(res =>{
                if (res.status === 201) {
                    navigate("/hospital/login");
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

                        <div id="signUpHospitalStep1">
                            <Input
                                id="txtEmailSignUpHospital"
                                label="Email"
                                placeholder="Digite seu email..."
                                type="email"
                                enabled={true}
                                value={email}
                                setValue={setEmail}
                                />
                            <Input
                                id="txtPasswordSignUpHospital"
                                label="Senha"
                                placeholder="Digite sua senha..."
                                type="password"
                                enabled={true}
                                value={password}
                                setValue={setPassword}
                                />
                            <Input
                                id="txtConfirmPasswordSignUpHospital"
                                label="Confirme sua senha"
                                placeholder="Digite sua senha novamente..."
                                type="password"
                                enabled={true}
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                />
                            <CardButton label="Próximo" id="btnNextSignUpHospitalStep1" eventClick={() => goToStep2()}/>
                            <p>Já possui uma conta?</p>
                            <p><a onClick={() => navigate("/donator/login")}>Entre</a></p>
                        </div>

                    : step === 2 ? 

                        <div id="signUpHospitalStep2">
                            <Input
                                id="txtNameSignUpHospital"
                                label="Nome do hospital"
                                placeholder="Digite seu nome..."
                                type="text"
                                enabled={true}
                                value={name}
                                setValue={setName}
                                />
                            <Input
                                id="txtCNPJSignUpHospital"
                                label="CNPJ"
                                placeholder="Digite o CNPJ do hospital..."
                                type="text"
                                enabled={true}
                                mask="99.999.999/9999-99"
                                maskChar="_"
                                value={cnpj}
                                setValue={setCNPJ}
                                />
                            <Input
                                id="txtTelephoneSignUpHospital"
                                label="Telefone"
                                placeholder="Digite o telefone do hospital..."
                                type="tel"
                                enabled={true}
                                mask="(99) 9999-9999"
                                maskChar="_"
                                value={telephone}
                                setValue={setTelephone}
                                />
                            <div>
                            </div>
                            <CardButton label="Próximo" id="btnNextSignUpHospitalStep2" eventClick={() => goToStep3()}/>
                        </div>

                    : step === 3 ?

                        <div id="signUpHospitalStep3">
                            <div className="horizontal">
                                <Input
                                    id="txtCEPSignUpHospital"
                                    label="CEP"
                                    placeholder="Digite o CEP do hospital..."
                                    type="text"
                                    enabled={true}
                                    size="medium"
                                    mask="99999-999"
                                    maskChar="_"
                                    value={cep}
                                    setValue={setCEP}
                                    />
                                <Select
                                    id="cmbUFSignUpHospital"
                                    label="UF"
                                    options={estados.map(estado => (estado.sigla))}
                                    enabled={false}
                                    size="small"
                                    value={uf}
                                    setValue={setUF}
                                    />
                            </div>
                            <Select
                                id="cmbCitySignUpHospital"
                                label="Cidade"
                                options={(municipios.length === 0) ? ["Selecione primeiro um UF..."] : municipios.map(municipio => (municipio.nome))}
                                enabled={false}
                                value={(city === "") ? "Selecione primeiro um UF..." : city}
                                setValue={setCity}
                                />
                            <Input
                                id="txtNeighborhoodSignUpHospital"
                                label="Bairro"
                                placeholder="Digite o bairro do hospital..."
                                type="text"
                                enabled={false}
                                value={neighborhood}
                                setValue={setNeighborhood}
                                />
                            <div className="horizontal">
                                <Input
                                    id="txtAddressSignUpHospital"
                                    label="Endereço"
                                    placeholder="Digite o endereço do hospital..."
                                    type="text"
                                    enabled={false}
                                    size="medium"
                                    value={address}
                                    setValue={setAddress}
                                    />
                                <Input
                                    id="txtNumberSignUpHospital"
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
                            <CardButton label="Finalizar" id="btnNextSignUpHospitalStep3" eventClick={() => finishSignUp()}/>
                        </div>

                    : <></>}
                </div>
            </div>

            <BottomBar/>
            {loading ? <Loading/> : <></>}
        </>
    );
}

export default SignUpHospital;