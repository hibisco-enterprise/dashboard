import React from 'react';
import {MenuDonator} from '../components/Menu';
import Question from '../components/Question';

export default function FAQ(props) {

    return(
        <div className="dashboard">
            <MenuDonator selected="faq"/>
            <div className="section">
                <h1>Perguntas Frequentes</h1>
                <div classname="sectionFAQ">
                    <h2>Após doar sangue</h2>
                    <Question 
                        question="O que é o Manifesto Comunista?" 
                        explanation="O Manifesto comunista, originalmente denominado Manifesto do Partido comunista, 
                        publicado pela primeira vez em 21 de fevereiro de 1848, é historicamente um dos tratados políticos 
                        de maior influência mundial. Comissionado pela Liga dos Comunistas e escrito pelos teóricos fundadores 
                        do socialismo científico Karl Marx e Friedrich Engels, expressa o programa e propósitos da Liga."    
                    />
                    <Question 
                        question="O que é o Manifesto Comunista?" 
                        explanation="O Manifesto comunista, originalmente denominado Manifesto do Partido comunista, 
                        publicado pela primeira vez em 21 de fevereiro de 1848, é historicamente um dos tratados políticos 
                        de maior influência mundial. Comissionado pela Liga dos Comunistas e escrito pelos teóricos fundadores 
                        do socialismo científico Karl Marx e Friedrich Engels, expressa o programa e propósitos da Liga."    
                    />
                </div>
                
                <div className="sectionFAQ">
                    <h2>Após doar sangue</h2>
                    <Question 
                        question="O que é o Manifesto Comunista?" 
                        explanation="O Manifesto comunista, originalmente denominado Manifesto do Partido comunista, 
                        publicado pela primeira vez em 21 de fevereiro de 1848, é historicamente um dos tratados políticos 
                        de maior influência mundial. Comissionado pela Liga dos Comunistas e escrito pelos teóricos fundadores 
                        do socialismo científico Karl Marx e Friedrich Engels, expressa o programa e propósitos da Liga."    
                    />
                    <Question 
                        question="O que é o Manifesto Comunista?" 
                        explanation="O Manifesto comunista, originalmente denominado Manifesto do Partido comunista, 
                        publicado pela primeira vez em 21 de fevereiro de 1848, é historicamente um dos tratados políticos 
                        de maior influência mundial. Comissionado pela Liga dos Comunistas e escrito pelos teóricos fundadores 
                        do socialismo científico Karl Marx e Friedrich Engels, expressa o programa e propósitos da Liga."    
                    />
                </div>
            </div>
        </div>
    )

}