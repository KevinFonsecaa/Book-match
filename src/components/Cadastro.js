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


      <form className='row row-cols-lg-auto g-3 align-items-center justify-content-center' >
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Nome do livro</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="EX: O hobbit" />
        </div>

        <br/>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Nome do autor</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="EX: Tokkien" />
        </div>

        <br/>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Gênero</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="EX: Fantasia" />
        </div>

        <br/>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">número de páginas</label>
          <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Ex: 150" />
        </div>

        <br/>

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Sinopse</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Ex: Em uma terra fantástica e única, um hobbit..."></textarea>
        </div>


      </form>



    </div>
  );
};

export default Cadastro;
