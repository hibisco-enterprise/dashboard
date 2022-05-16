import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MenuDonator } from "../components/Menu";
import Map, { Marker } from 'react-map-gl';
import mapMarker from "../assets/img/map-marker.png";

export default function Index() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGliaXNjb2VudGVycHJpc2UiLCJhIjoiY2wzMG84c2czMWxxYTNrbnNwanYwZGJobSJ9.EeRJgLtkjLj6ljP5KuesPg'
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
                        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                        onViewPortChange={(nextViewPort) => setViewPort(nextViewPort)}
                    >
                        <Marker
                            latitude={-23.555702209472656}
                            longitude={-46.659706115722656}
                            anchor="bottom" >
                            <img src={mapMarker} style={{ fontSize: viewPort.zoom * 10 }} />
                        </Marker>
                    </Map>;
                </div>
            </div>

        </>
    );

}   