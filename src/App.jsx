import Register from "./components/Register";
import "./styles/styles.scss";
import NavbarComponent from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
