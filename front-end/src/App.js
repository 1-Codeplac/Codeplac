import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componente de Proteção (Segurança das rotas)
import ProtectedRoute from "./Components/jsx/ProtectedRoute"; // ⚠️ Verifique se a pasta está correta

// Páginas
import Homepage from "./pages/js/homepage";
import Sobre from "./pages/js/sobre";
import Ranking from "./pages/js/ranking";
import Eventos from "./pages/js/eventos";
import Equipe from "./pages/js/equipe";
import Historico from "./pages/js/historico";
import Galeria from "./pages/js/galeria";
import Contato from "./pages/js/contato";
import Login from "./pages/js/login";
import Cadastro from "./pages/js/cadastro";
import Senha from "./pages/js/senha";
import Inscricao from "./pages/js/inscricao";
import Feedback from "./pages/js/feedback";
import Recrutamento from "./pages/js/recrutamento";
import Formulario from "./pages/js/formulario";
import Perfil from "./pages/js/perfil";
import Admin from "./pages/js/admin";
import Privacidade from "./pages/js/privacidade";
import Termos from "./pages/js/termos";
import Cookies from "./pages/js/cookies";
import Juiz from "./pages/js/juiz";
import Desafios from "./pages/js/desafios";
import Lider from "./pages/js/lider";

// CSS
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ROTAS PÚBLICAS  */}
        <Route path="/" element={<Homepage />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/senha" element={<Senha />} />
        <Route path="/recrutamento" element={<Recrutamento />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/formulario" element={<Formulario />} />

        {/*  ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/lider" element={<Lider />} />
          <Route path="/juiz" element={<Juiz />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* Somente ADMIN logado acessa */}
        <Route element={<ProtectedRoute roleExigida="admin" />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;