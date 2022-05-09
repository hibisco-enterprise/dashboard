import React, {useState, useEffect} from "react";
import {MenuDonator} from "../components/Menu";
import StyledChart from "../components/StyledCharts";

export default function History() {

    return(
        <div className="dashboard">
            <MenuDonator selected="history"/>
            <div className="section">
                <h1>Histórico</h1>
                <div>
                    <h2>Análise das suas últimas doações</h2>
                    <StyledChart data={[["Ano", "Quantidade"], [2018, 3], [2019, 4], [2020, 0], [2021, 2], [2022, 4]]}/>
                </div>
                                     
            </div>
        </div>
    )
    
}