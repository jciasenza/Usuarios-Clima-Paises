import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Usuarios from "./pages/Usuarios";
import Error404 from "./pages/Error404";
import Clima from "./pages/Clima";
import Paises from "./pages/Paises";

function App() {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {" "}
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/clima" element={<Clima />} />
          <Route path="/paises" element={<Paises />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
