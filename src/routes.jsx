import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Index from "./pages/Index"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}