import React, { useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';

import { firestore } from '../utils/firebase'

const SearchBooks = () => {
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
      <h2>Pesquisar Livros</h2>

      <form className='row row-cols-lg-auto g-3 align-items-center justify-content-center' >
        <div className="col-12">
          <label>Autor:</label>
          <select value={author} onChange={e => setAuthor(e.target.value)} className="form-select col-lg-4">
            <option value="">Selecione um autor</option>
            <option value="Suzanne Collins">Suzanne Collins</option>
            <option value="George Orwell">George Orwell</option>
          </select>
        </div>
        <div className="col-12">
          <label>Gênero:</label>
          <select value={genre} onChange={e => setGenre(e.target.value)} className="form-select">
            <option value="">Selecione um gênero</option>
            <option value="Ficção">Ficção</option>
            <option value="distopia">Distopia</option>
            <option value="romance">Romance</option>
          </select>
        </div>
        <div className="col-12">
          <label>Livros:</label>
          <select value={bookName} onChange={e => setBookName(e.target.value)} className="form-select">
            <option value="">Selecione o livro desejado</option>
            <option value="Jogos Vorazes">Jogos Vorazes</option>
            <option value="Gregor The Overlander">Gregor The Overlander</option>
            <option value="1984">1984</option>
          </select>
        </div>
        <div className="col-12" >
          <button className="btn btn-primary" style={{ marginTop: 17 }} onClick={handleSearch}>Pesquisar</button>
        </div>


      </form>


      {/* Exibir resultados */}
      <div className='container mt-6' style={{ 'marginTop': 25 }}>
        {searchResults.length > 0 ? (
          <div>
            <h3 className='mt-5' >Resultados da Pesquisa:</h3>

            <ul>
              {searchResults.map(book => (
                <div className='col-lg-12 border rounded mt-5'>
                  <li key={book.id} style={{ listStyle: 'none' }}>
                    <strong>Título:</strong> {book.nomeLivros}<br />
                    <strong>Autor:</strong> {book.autor}<br />
                    <strong>Gênero:</strong> {book.genero}<br />
                    <strong>Descrição:</strong> {book.descricao}<br />
                    <strong>Quantidade de Páginas:</strong> {book.qtdPaginas}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBooks;
