import * as React from 'react';
import { useState } from 'react';
import { MenuDonator } from "../components/Menu";
import Map, { Marker } from 'react-map-gl';
import mapMarker from "../assets/img/map-marker.png";
import 'mapbox-gl/dist/mapbox-gl.css'; 

export default function Index() {
    const [viewPort, setViewPort] = useState({
        latitude: -23.555702209472656,
        longitude: -46.659706115722656,
        zoom: 14
    })
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

                        <Marker
                            longitude={-46.659706115722656}
                            latitude={-23.555702209472656}
                            anchor="bottom"
                            color='#F9361B'>
                            {/* <img src="./pin.png" /> */}
                        </Marker>
                    </Map>
                </div>
            </div>

        </>
    );

}   