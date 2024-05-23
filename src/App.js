import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBooks from './components/SearchBooks';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import { AuthProvider } from './utils/auth';
import Editar from './components/Editar';


const App = () => {
  return (
   <AuthProvider>
     <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesquisar" element={<SearchBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/editar/:id" element={<Editar />} />
        </Routes>
      </div>
    </Router>
   </AuthProvider>
  );
};

export default App;
