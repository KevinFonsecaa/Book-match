import React, { useState } from 'react';
import { firestore } from '../utils/firebase'; // Importe o objeto firestore do seu arquivo firebase.js

const SearchBooks = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const booksRef = firestore.collection('livros');
      let query = booksRef;

      // Construa a consulta com base nos filtros selecionados
      if (author !== '') {
        query = query.where('autor', '==', author);
      }
      if (genre !== '') {
        query = query.where('genero', '==', genre);
      }
      if (pageCount !== '') {
        query = query.where('qtdPaginas', '==', parseInt(pageCount));
      }

      // Execute a consulta
      const snapshot = await query.get();

      // Limpe os resultados anteriores
      setSearchResults([]);

      // Exiba os resultados na tela
      const results = [];
      snapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  return (
    <div>
      <h2>Pesquisar Livros</h2>
      <label>Autor:</label>
      <select value={author} onChange={e => setAuthor(e.target.value)}>
        <option value="">Selecione um autor</option>
        <option value="Suzanne Collins">Suzanne Collins</option>
        <option value="George Orwell">George Orwell</option>
      </select>
      <label>Gênero:</label>
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        <option value="">Selecione um gênero</option>
        <option value="Ficção">Ficção</option>
        <option value="distopia">distopia</option>
      </select>
      <label>Quantidade de Páginas:</label>
      <select value={pageCount} onChange={e => setPageCount(e.target.value)}>
        <option value="">Selecione a quantidade de páginas</option>
        <option value="326">326</option>
        <option value="400">400</option>
      </select>
      <button onClick={handleSearch}>Pesquisar</button>

      {/* Exibir resultados */}
      <div>
        {searchResults.length > 0 ? (
          <div>
            <h3>Resultados da Pesquisa:</h3>
            <ul>
              {searchResults.map(book => (
                <li key={book.id}>
                  <strong>Título:</strong> {book.nomeLivro}<br />
                  <strong>Autor:</strong> {book.autor}<br />
                  <strong>Gênero:</strong> {book.genero}<br />
                  <strong>Descrição:</strong> {book.descricao}<br />
                  <strong>Quantidade de Páginas:</strong> {book.qtdPaginas}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBooks;
