import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dog from "./pages/Dog"

export default function RoutesComponent() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/dog" element={<Dog/>}/>
            </Routes>
        </BrowserRouter>
    );
}