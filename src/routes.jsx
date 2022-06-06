import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Index from "./pages/Index"

import LoginDonator from "./pages/donator/Login"
import SignUpDonator from "./pages/donator/SignUp"
import Map from "./pages/donator/Map"
import Profile from "./pages/donator/Profile"
import HistoryDonator from "./pages/donator/History"
import FAQ from "./pages/donator/FAQ"
import Schedule from "./pages/donator/Schedule"

import LoginHospital from "./pages/hospital/Login"
import SignUpHospital from "./pages/hospital/SignUp"
import Requests from "./pages/hospital/Requests"
import HistoryHospital from "./pages/hospital/History"
import Stock from "./pages/hospital/Stock"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Index/>}/>

                <Route path="/donator/login" element={<LoginDonator/>}/>
                <Route path="/donator/signup" element={<SignUpDonator/>}/>
                <Route path="/donator/map" element={<Map/>}/>
                <Route path="/donator/profile" element={<Profile/>}/>
                <Route path="/donator/history" element={<HistoryDonator/>}/>
                <Route path="/donator/faq" element={<FAQ/>}/>
                <Route path="/donator/schedule" element={<Schedule/>}/>

                <Route path="/hospital/login" element={<LoginHospital/>}/>
                <Route path="/hospital/signup" element={<SignUpHospital/>}/>
                <Route path="/hospital/requests" element={<Requests/>}/>
                <Route path="/hospital/history" element={<HistoryHospital/>}/>
                <Route path="/hospital/stock" element={<Stock/>}/>
            </Routes>
        </BrowserRouter>
    );
}