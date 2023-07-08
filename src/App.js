import "./App.css";
import About from "./components/about";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/login";
import Singup from "./components/singup";
import AlertItem from "./components/Alert"
import React,{useState} from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, typ) => {
    setAlert({
      message: msg,
      type: typ,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar  />
          <AlertItem Alert={alert} />
          <Routes>
            <Route path="/" element={<Home  showAlert={showAlert}/>} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
            <Route path="/login" element={<Login  showAlert={showAlert}/>} />
            <Route path="/signup" element={<Singup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
