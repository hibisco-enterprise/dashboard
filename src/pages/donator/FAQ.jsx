import React, {useState} from 'react';
import {MenuDonator} from '../../components/Menu';
import Question from '../../components/Question';

export default function FAQ(props) {


    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idDonator": null,"bloodType":"","user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});

    return(
        <div className="dashboard">
            <MenuDonator selected="faq"/>
            <div className="section">
                <h1>Perguntas Frequentes</h1>
                <div className="sectionFAQ">
                    <h2>Dúvidas comuns</h2>
                    <Question 
                        question="Qual a importância da doação de sangue?" 
                        answer="A doação de sangue é um compromisso social, pois o sangue é necessário para realização das cirurgias nas unidades hospitalares, pacientes em tratamento quimioterápico, pacientes com leucemia ou aqueles que realizaram transplantes no Centro de Transplante de Medula Óssea (CEMO)."    
                    />
                    <Question 
                        question="O que é feito com o sangue que doamos?" 
                        answer="Após a coleta, a bolsa de sangue é fracionada em componentes sanguíneos (concentrado de hemácias, de plaquetas e plasma). Esses componentes são liberados para uso somente após o resultado dos exames sorológicos. Uma única unidade doada pode beneficiar três pacientes."    
                    />
                    <Question 
                        question="O que é preciso para doar sangue?" 
                        answer="Podem doar sangue pessoas entre 16 e 69 anos e que estejam pesando mais de 50kg. Além disso, é preciso apresentar documento oficial com foto e menores de 18 anos só podem doar com consentimento formal dos responsáveis (acesse o formulário). Pessoas com febre, gripe ou resfriado, diarreia recente, grávidas e mulheres no pós-parto não podem doar temporariamente."    
                    />
                    <Question 
                        question="Quem não pode doar sangue?" 
                        answer="Não podem doar sangue pessoas que tiveram hepatite após os 11 anos de idade, tenham evidência clínica ou laboratorial de doenças sexualmente transmissíveis, como hepatite B e C, aids (vírus HIV), doenças ligadas ao vírus HTLV I e II. Doenças de chagas, o uso de drogas ilícitas injetáveis e malária também são impedimentos definitivos para doar sangue."    
                    />
                </div>

                <div className="sectionFAQ">
                    <h2>Antes de doar sangue</h2>
                    <Question 
                        question="É preciso levar algum documento de identidade para a doação de sangue?" 
                        answer="Sim. O candidato deve apresentar documento original com foto, expedido pelo órgão oficial. Exemplos: Carteira de Identidade (RG ou RNE), passaporte, Carteira de Trabalho, Carteira de Identidade de Profissional, Carteira Nacional de Habilitação com foto e Certificado de Reservista."    
                    />
                    <Question 
                        question="É necessário estar em jejum para doar sangue?" 
                        answer="O doador não deve estar em jejum, mas é importante evitar alimentos gordurosos três horas antes da doação."    
                    />
                </div>
                
                <div className="sectionFAQ">
                    <h2>Durante a doação</h2>
                    <Question 
                        question="Quanto tempo dura a doação de sangue?" 
                        answer="O procedimento todo (cadastro, aferição de sinais vitais, teste de anemia, triagem clínica, coleta do sangue e lanche) dura em média 40 minutos."    
                    />
                    <Question 
                        question="Doar sangue dói?" 
                        answer="Percepção de dor é pessoal. É necessário puncionar a veia para retirada do sangue."    
                    />
                </div>

                <div className="sectionFAQ">
                    <h2>Após doar sangue</h2>
                    <Question 
                        question="Quanto tempo organismo leva para repor o sangue doado?" 
                        answer="O organismo repõe o volume de sangue doado nas primeiras 72 horas após a doação."    
                    />
                    <Question 
                        question="Quantas vezes por ano posso doar sangue?" 
                        answer="Para homens, o intervalo mínimo entre as doações é de 60 dias (com até quatro doações no período de 12 meses). Para mulheres, o intervalo mínimo é de 90 dias (com até três no período de 12 meses)."    
                    />
                </div>
            </div>
        </div>
    )

}