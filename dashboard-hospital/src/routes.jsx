import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}