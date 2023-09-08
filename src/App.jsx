import "./styles/styles.scss";
import NavbarComponent from "./components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <NavbarComponent />
      <h1>Rincon Matero</h1>
    </NextUIProvider>
  );
}

export default App;
