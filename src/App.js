import React from "react";
import AppRouter from "./Router";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/*" element={<AppRouter />} />
        </Routes>
    );
};

export default App;
