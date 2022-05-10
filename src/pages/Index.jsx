import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MenuDonator } from "../components/Menu";

export default function Index() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGliaXNjb2VudGVycHJpc2UiLCJhIjoiY2wzMG84c2czMWxxYTNrbnNwanYwZGJobSJ9.EeRJgLtkjLj6ljP5KuesPg'

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <>
            <MenuDonator selected="home" />
            <div className='section'>
                <div ref={mapContainer} className="map-container" id='mapContainer'/>
            </div>
        </>
    );

}   