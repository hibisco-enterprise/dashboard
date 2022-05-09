import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MenuDonator } from "../components/Menu";
import Map from "../components/Map";

export default function Index() {
    mapboxgl.accessToken = 'pkeyJ1IjoiaGliaXNjb2VudGVycHJpc2UiLCJhIjoiY2wyNTd1Nmd0MTVoODNjcDc5OXBmODYxMCJ9.PQo8LI7tQYbPRTdWbCJXSw'

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
            <div ref={mapContainer} className="map-container" id='mapContainer'/>
            {/* <Map /> */}
        </>
    );

}   