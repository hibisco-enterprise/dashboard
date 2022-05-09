import React from "react";
import { MenuDonator } from "../components/Menu";
import Map from "../components/Map";

export default function Index() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    return (
        <>
            <MenuDonator selected="home" />
            <Map />
        </>
    );

}