import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { collection, query, getDocs, where, doc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../utils/auth';
import { firestore } from '../utils/firebase';
import '../index.css'; // Importar o arquivo CSS

const SearchBooks = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookName, setBookName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const booksRef = collection(firestore, 'Livros');
      let q = query(booksRef);

      if (author !== '') {
        q = query(q, where('autor', '==', author));
      }

      if (genre !== '') {
        q = query(q, where('genero', '==', genre));
      }

      if (bookName !== '') {
        q = query(q, where('nomeLivros', '==', bookName));
      }

      const snapshot = await getDocs(q);

      setSearchResults([]);

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

  const deleteBook = async (id) => {
    setIsDeleting(true);
    try {
      const bookRef = doc(firestore, 'Livros', id);
      await deleteDoc(bookRef);
      setSearchResults((prevResults) => prevResults.filter(book => book.id !== id));
      setSelectedBook(null);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='container'>
      <h2>Pesquisar Livros</h2>
      <form className='row row-cols-lg-auto g-3 align-items-center justify-content-center'>
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
            <option value="">Selecione um Gênero</option>
            <option value="Ficção">Ficção</option>
            <option value="Distopia">Distopia</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div className="col-12">
          <label>Livros:</label>
          <select value={bookName} onChange={e => setBookName(e.target.value)} className="form-select">
            <option value="">Selecione o livro desejado</option>
            <option value="Jogos Vorazes">Jogos Vorazes</option>
            <option value="Gregor The Overlander">Gregor The Overlander</option>
            <option value="1984">1984</option>
            <option value="Clube da luta">Clube da luta</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" style={{ marginTop: 17 }} onClick={handleSearch}>Pesquisar</button>
        </div>
      </form>

      <div className='container mt-6' style={{ marginTop: 25 }}>
        {searchResults.length > 0 ? (
          <div>
            <h3 className='mt-5'>Resultados da Pesquisa:</h3>
            <div className='row'>
              {searchResults.map(book => (
                <div key={book.id} className='col-md-4'>
                  <div className='card mt-5'>
                    {book.imageUrl && (
                      <img src={book.imageUrl} className="card-img-top book-image" alt={book.nomeLivros} />
                    )}
                    <div className='card-body'>
                      <h5 className='card-title'>{book.nomeLivros}</h5>
                      <p className='card-text'>Autor: {book.autor}</p>
                      <p className='card-text'>Gênero: {book.genero}</p>
                      <p className='card-text'>Descrição: {book.descricao}</p>
                      <p className='card-text'>Qtd de páginas: {book.qtdPaginas}</p>
                     <a href={`${book.pdfUrl}`} target='blank' download>Baixar</a> 
                      <div className='d-flex gap-2'>
                        {user && (
                          <>
                            <Link to={`/editar/${book.id}`} className="btn btn-primary col-lg-3 d-flex justify-content-center">
                              <MdEdit size={20} />Editar
                            </Link>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setSelectedBook(book)}>
                              <MdDelete size={20} />Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Excluir Livro</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedBook && !deleteSuccess && (
                <p>Tem certeza de que deseja excluir o livro "{selectedBook.nomeLivros}"?</p>
              )}
              {deleteSuccess && (
                <p>Livro excluído com sucesso!</p>
              )}
            </div>
            <div className="modal-footer">
              {!deleteSuccess ? (
                <>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteBook(selectedBook.id)} disabled={isDeleting}>
                    {isDeleting ? 'Excluindo...' : 'Excluir'}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
