import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Index from "./pages/donator/Index"
import Profile from "./pages/donator/Profile"
import History from "./pages/donator/History"
import FAQ from "./pages/donator/FAQ"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                <Route path="/" element={<Index/>}/>
                <Route path="/donator/profile" element={<Profile/>}/>
                <Route path="/donator/history" element={<History/>}/>
                <Route path="/donator/faq" element={<FAQ/>}/>
            </Routes>
        </BrowserRouter>
    );
}