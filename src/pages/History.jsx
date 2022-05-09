import React, {useState, useEffect} from "react";
import {MenuDonator} from "../components/Menu";

export default function History() {

    return(
        <div className="dashboard">
            <MenuDonator selected="history"/>
            <div className="section">
                <h1>Histórico</h1>
                                     
            </div>
        </div>
    )
    
}