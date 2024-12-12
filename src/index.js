import React from "react";
import ReactDOM from "react-dom/client"; 
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Menggunakan createRoot untuk rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

// Jika Anda ingin mulai mengukur kinerja di aplikasi Anda,
// kirimkan fungsi untuk mencatat hasil (misalnya: reportWebVitals(console.log))
// atau kirim ke endpoint analitik. Pelajari lebih lanjut: https://bit.ly/CRA-vitals
reportWebVitals();
