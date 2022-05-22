import React from "react";
import {MenuDonator} from "../../components/Menu";
import Modal from "../../components/Modal";

export default function Index() {

    return(
        <div className="dashboard">
            <MenuDonator selected="home"/>
            <Modal 
                photo="https://www.pc.rs.gov.br/upload/recortes/202201/21121934_439618_GD.jpg"
                name="Cativeiro do Caralho nessa porra"
                address="Rua meu pau quadrado"
                tel="(11) 8328-9214"
            />
        </div>
    )
    
}