import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const Cadastro = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookName, setBookName] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cria um novo documento na coleção "Livros"
      const docRef = await addDoc(collection(firestore, "Livros"), {
        autor: author,
        descricao: synopsis,
        genero: genre,
        nomeLivros: bookName,
        qtdPaginas: pageCount
      });
      console.log("Documento escrito com ID: ", docRef.id);
      // Limpa o formulário após o cadastro
      setAuthor('');
      setGenre('');
      setBookName('');
      setPageCount('');
      setSynopsis('');
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  };

  return (
    <div className='container'>
      <form className='row g-3 justify-content-center mt-3' onSubmit={handleSubmit}>
        <div className="col-12 col-md-6">
          <label htmlFor="bookName" className="form-label">Nome do livro</label>
          <input type="text" className="form-control" id="bookName" placeholder="Ex: O hobbit" value={bookName} onChange={(e) => setBookName(e.target.value)} />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="authorName" className="form-label">Nome do autor</label>
          <input type="text" className="form-control" id="authorName" placeholder="Ex: Tolkien" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="bookGenre" className="form-label">Gênero</label>
          <input type="text" className="form-control" id="bookGenre" placeholder="Ex: Fantasia" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="pageNumber" className="form-label">Número de páginas</label>
          <input type="number" className="form-control" id="pageNumber" placeholder="Ex: 150" value={pageCount} onChange={(e) => setPageCount(e.target.value)} />
        </div>

        <div className="col-12">
          <label htmlFor="synopsis" className="form-label">Sinopse</label>
          <textarea className="form-control" id="synopsis" rows="3" placeholder="Ex: Em uma terra fantástica e única, um hobbit..." value={synopsis} onChange={(e) => setSynopsis(e.target.value)}></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;