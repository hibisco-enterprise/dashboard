import React, {useState} from "react";
import { MenuHospital } from "../../components/Menu";
import { Input } from "../../components/Input";
import { CardRequest } from "../../components/MiniCard";

export default function Requests(props) {
    const today = new Date().toISOString().slice(0,10);

    const [date, setDate] = useState(today)

    return (
        <div className="dashboard">
            <MenuHospital selected="requests" />
            <div className="section">
                <h1>Agendamentos</h1>
                <div style={{marginBottom: '32px'}}>
                    <h2>Verificar disponibilidade de horário por data</h2>
                    <Input 
                        id="dtpDateRequest"
                        label="Data"
                        type="date"
                        value={date}
                        setValue={setDate}
                        min={today}
                    />
                    <div className="availableTimes">
                        <div className="availableTime">
                            <img alt=" " />
                            <span>08:00</span>
                        </div>
                    </div>
                </div>

                    <CardRequest 
                        photo="https://yt3.ggpht.com/SzBlzEK0LwtKhB0vBc__BfWQY4gchM8W0LfQ-n-McyhpINCKd6pSrlJH0mCLbRLutI_wV16E=s900-c-k-c0x00ffffff-no-rj"
                        name="Cobra Agiota"
                        date="28/05"
                        hour="15:00"
                    />
            </div>
        </div>
    )

}