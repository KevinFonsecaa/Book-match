import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../utils/firebase';

const Cadastro = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookName, setBookName] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [booklink, setBookLink] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [message, setMessage] = useState(false);
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pdf || pdf.type !== 'application/pdf') {
      setError('Por favor, selecione um arquivo PDF valido.');
      return;
    }

    if (image && !image.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem valido.');
      return;
    }

    setLoading(true);

    try {
      // Cria um novo documento na coleÃ§Ã£o "Livros" e obtÃ©m o ID do documento
      const docRef = await addDoc(collection(firestore, "Livros"), {
        autor: author,
        descricao: synopsis,
        genero: genre,
        nomeLivros: bookName,
        qtdPaginas: pageCount,
        link: booklink,
        imageUrl: '',
        pdfUrl: '',
      });

      const docId = docRef.id;
      let imageUrl = '';
      let pdfUrl = '';

      const storage = getStorage();

      if (image) {
        const imageRef = ref(storage, `images/${docId}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (pdf) {
        const pdfRef = ref(storage, `pdfs/${docId}_${pdf.name}`);
        await uploadBytes(pdfRef, pdf);
        pdfUrl = await getDownloadURL(pdfRef);
      }


      await updateDoc(doc(firestore, "Livros", docId), {
        imageUrl: imageUrl,
        pdfUrl: pdfUrl,
      });

      setMessage('Livro cadastrado com sucesso.');
      setAlert('success');
      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false);
      }, 2000);

      setAuthor('');
      setGenre('');
      setBookName('');
      setPageCount('');
      setSynopsis('');
      setBookLink('');
      setImage(null);
      setPdf(null);
    } catch (error) {
      setMessage('Erro ao atualizar o livro.', error);
      setAlert('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {showAlert && (
            <div className='w-100 d-flex justify-content-end'>
              <div className={`alert alert-${alert} col-lg-3 mt-3 alert-slide-in ${!showAlert && 'alert-slide-out'}`} style={{ 'height': 60 }} role='alert'>
                <p>{message}</p>
              </div>
            </div>
          )}
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
              <textarea className="form-control" id="synopsis" rows="3" placeholder="Ex: Em uma terra fantastica e antiga, um hobbit..." value={synopsis} onChange={(e) => setSynopsis(e.target.value)}></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="bookImage" className="form-label">Imagem do livro</label>
              <input type="file" className="form-control" id="bookImage" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="col-12">
              <label htmlFor="bookPdf" className="form-label">Documento PDF</label>
              <input type="file" className="form-control" id="bookPdf" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
            </div>
            <div className="col-12">
              <label htmlFor="book-link" className="form-label">Compre aqui</label>
              <input type="link" className="form-control" id="book-link" value={booklink} onChange={(e) => setBookLink(e.target.value)} />
            </div>
            {error && (
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
