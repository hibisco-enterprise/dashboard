import Modal from "../../components/Modal";
import * as React from 'react';
import { useState } from 'react';
import { MenuDonator } from "../../components/Menu";
import MapBox, { Marker, Popup } from 'react-map-gl';
// import mapMarker from "../assets/img/elipse.svg";
import 'mapbox-gl/dist/mapbox-gl.css';
import { apiKitsune } from '../../apis';

export default function Map() {
    const [pins, setPins] = useState([]);
    const [currentPin, setCurrentPin] = useState(null);
    const [viewPort, setViewPort] = useState({
        latitude: (localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user).user.address.latitude : -23.555702209472656,
        longitude: (localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user).user.address.longitude : -46.659706115722656,
        zoom: 14
    })

    const [user, setUser] = useState((localStorage.getItem("user") !== null) ? JSON.parse(localStorage.user) : {"idDonator": null,"bloodType":"","user":{"idUser": null,"name":"","email":"","documentNumber":"","phone":"","authenticated": null, "address":{"idAddress": null,"address":"","neighborhood":"","city":"","uf":"","cep":"","number": "","latitude":null,"longitude":null}}});


    React.useEffect(() => {
        apiKitsune.get("/hospitals").then((res) => {
            var longLatArray = [];
            console.log("raw response");
            console.log(res);
            console.log('data length ' + res.data.length);

            for (var i = 0; i < res.data.length; i++) {
                var idUser = res.data[i].user.idUser;
                var longitude = res.data[i].user.address.longitude;
                var latitude = res.data[i].user.address.latitude;
                var name = res.data[i].user.name;
                var phone = res.data[i].user.phone;
                var address = res.data[i].user.address.address;
                var number = res.data[i].user.address.number;
                
                var objHospital = {
                    index: i,
                    idUser: idUser,
                    name: name,
                    phone: phone,
                    address: address,
                    number: number,
                    longitude: longitude,
                    latitude: latitude
                }
                longLatArray.push(objHospital);
                console.log('latitude and longitude and id', latitude, longitude, idUser, i);
            }

            setPins(longLatArray);
        }).catch((error) =>
            console.log("Error getting hospitals response " + error)
        );
    }, []);


    const handleMarkerClick = (index) => {
        setCurrentPin(pins[index])
    };

    return (
        <>
            <div className="home-index">
                <MenuDonator selected="home" />
                <div className='map-container'>
                    <MapBox
                        initialViewState={viewPort}
                        style={{ width: '100vw', height: '100vh' }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoiaGliaXNjb2VudGVycHJpc2UiLCJhIjoiY2wzMG84c2czMWxxYTNrbnNwanYwZGJobSJ9.EeRJgLtkjLj6ljP5KuesPg">
                        {
                            pins.map(pins => (
                                <>
                                    <Marker
                                        longitude={pins.longitude}
                                        latitude={pins.latitude}
                                        anchor="right"
                                        color='#F9361B'
                                        onClick={() => handleMarkerClick(pins.index)}
                                    >
                                    </Marker>
                                </>
                            ))
                        }
                    </MapBox>
                </div>
                {currentPin != null ?
                    <Modal
                        photo="https://www.pc.rs.gov.br/upload/recortes/202201/21121934_439618_GD.jpg"
                        name={currentPin.name}
                        address={currentPin.address}
                        tel={currentPin.phone}
                        closeFunction = {() => setCurrentPin(null)}
                    /> :
                    <></>}
            </div>
        </>
    );

}

