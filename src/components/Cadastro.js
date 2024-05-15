import React, { useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';

import { firestore } from '../utils/firebase'

const Cadastro = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookName, setBookName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const booksRef = collection(firestore, 'Livros');
      let q = query(booksRef); // Inicia a consulta base

      // Adiciona filtros Ã  consulta com base nos valores selecionados
      if (author !== '') {
        q = query(q, where('autor', '==', author));
      }

      if (genre !== '') {
        q = query(q, where('genero', '==', genre));
      }

      if (bookName !== '') {
        q = query(q, where('nomeLivros', '==', bookName));
      }


      const snapshot = await getDocs(q); // Executa a consulta

      // Limpe os resultados anteriores
      setSearchResults([]);

      // Exiba os resultados na tela
      const results = [];
      snapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  return (
    <div className='container'>


<form className='row g-3 justify-content-center mt-3' >
    <div className="col-12 col-md-6">
        <label htmlFor="bookName" className="form-label">Nome do livro</label>
        <input type="text" className="form-control" id="bookName" placeholder="EX: O hobbit" />
    </div>

    <div className="col-12 col-md-6">
        <label htmlFor="authorName" className="form-label">Nome do autor</label>
        <input type="text" className="form-control" id="authorName" placeholder="EX: Tolkien" />
    </div>

    <div className="col-12 col-md-6">
        <label htmlFor="bookGenre" className="form-label">Gênero</label>
        <input type="text" className="form-control" id="bookGenre" placeholder="EX: Fantasia" />
    </div>

    <div className="col-12 col-md-6">
        <label htmlFor="pageNumber" className="form-label">Número de páginas</label>
        <input type="number" className="form-control" id="pageNumber" placeholder="Ex: 150" />
    </div>

    <div className="col-12">
        <label htmlFor="synopsis" className="form-label">Sinopse</label>
        <textarea className="form-control" id="synopsis" rows="3" placeholder="Ex: Em uma terra fantástica e única, um hobbit..."></textarea>
    </div>

    <div>
    <button className="btn btn-primary col-2" style={{ marginTop: 17 }} >Cadastrar</button>
    </div>
    
</form>





    </div>
  );
};

export default Cadastro;
