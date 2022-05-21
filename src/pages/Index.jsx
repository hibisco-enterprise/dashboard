import * as React from 'react';
import { useState } from 'react';
import { MenuDonator } from "../components/Menu";
import Map, { Marker, Popup } from 'react-map-gl';
import mapMarker from "../assets/img/map-marker.png";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { apiKitsune } from '../apis';

export default function Index() {
    const [pins, setPins] = useState([]);
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
                var longitude = res.data[i].user.address.longitude;
                var latitude = res.data[i].user.address.latitude;
                var name = res.data[i].user.name;
                var phone = res.data[i].user.phone;
                var address = res.data[i].user.address.address
                var number = res.data[i].user.address.number
                var objHospital = {
                    name: name,
                    phone: phone,
                    address: address,
                    number: number,
                    longitude: longitude,
                    latitude: latitude
                }
                longLatArray.push(objHospital);
                console.log('latitude and longitude', latitude, longitude, i);
            }

            setPins(longLatArray);
        }).catch((error) =>
            console.log("Error getting hospitals response " + error)
        );
    }, []);

    return (
        <>
            <div className="home-index">
                <MenuDonator selected="home" />
                <div className='map-container'>
                    <Map
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
                                        color='#F9361B'>
                                        {/* <img src="./pin.png" /> */}
                                    </Marker>
                                    <Popup
                                        longitude={pins.longitude}
                                        latitude={pins.latitude}
                                        anchor="left"
                                    >
                                        <MenuDonator selected="home" />
                                    </Popup>
                                </>
                            ))
                        }
                    </Map>
                </div>
            </div>
        </>
    );

}   