import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

import Index from "./pages/donator/Index"
import Profile from "./pages/donator/Profile"
import HistoryDonator from "./pages/donator/History"
import FAQ from "./pages/donator/FAQ"

import HistoryHospital from "./pages/hospital/History"
import Stock from "./pages/hospital/Stock"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                <Route path="/" element={<Index/>}/>
                <Route path="/donator/profile" element={<Profile/>}/>
                <Route path="/donator/history" element={<HistoryDonator/>}/>
                <Route path="/donator/faq" element={<FAQ/>}/>

                <Route path="/hospital/history" element={<HistoryHospital/>}/>
                <Route path="/hospital/stock" element={<Stock/>}/>
            </Routes>
        </BrowserRouter>
    );
}