import Modal from "../../components/Modal";
import * as React from 'react';
import { useState } from 'react';
import { MenuDonator } from "../../components/Menu";
import MapBox, { Marker, Popup } from 'react-map-gl';
// import mapMarker from "../assets/img/elipse.svg";
import 'mapbox-gl/dist/mapbox-gl.css';
import { apiKitsune } from '../../apis';

export default function Map () {
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(1);
    const [viewPort, setViewPort] = useState({
        latitude: -23.555702209472656,
        longitude: -46.659706115722656,
        zoom: 14
    })
    
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
                var address = res.data[i].user.address.address
                var number = res.data[i].user.address.number
                var objHospital = {
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


    const handleMarkerClick = (id) => {
        alert(id);
        alert(currentPlaceId);
        setCurrentPlaceId(id);
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
                                        onClick={() => handleMarkerClick(pins.idUser)}
                                    >
                                        {/* <img src={mapMarker} /> */}
                                    </Marker>
                                    {
                                        pins.idUser === currentPlaceId && (
                                            <Popup
                                                longitude={pins.longitude}
                                                latitude={pins.latitude}
                                                anchor="left"
                                                onClose={() => setCurrentPlaceId(null)}
                                            >
                                                <Modal
                                                    photo="https://www.pc.rs.gov.br/upload/recortes/202201/21121934_439618_GD.jpg"
                                                    name="Cativeiro do Caralho nessa porra"
                                                    address="Rua meu pau quadrado"
                                                    tel="(11) 8328-9214"
                                                />
                                            </Popup>
                                        )}
                                </>
                            ))
                        }
                    </MapBox>
                </div>
            </div>
        </>
    );

}

