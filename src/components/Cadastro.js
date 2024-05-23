import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../utils/firebase';

const Cadastro = () => {
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookName, setBookName] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pdf || pdf.type !== 'application/pdf') {
      setError('Por favor, selecione um arquivo PDF válido.');
      return;
    }

    if (image && !image.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    setLoading(true);

    try {
      // Cria um novo documento na coleção "Livros" e obtém o ID do documento
      const docRef = await addDoc(collection(firestore, "Livros"), {
        autor: author,
        descricao: synopsis,
        genero: genre,
        nomeLivros: bookName,
        qtdPaginas: pageCount,
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

      // Atualiza o documento no Firestore com os URLs da imagem e do PDF
      await updateDoc(doc(firestore, "Livros", docId), {
        imageUrl: imageUrl,
        pdfUrl: pdfUrl,
      });

      console.log("Documento escrito com ID: ", docId);

      // Limpa o formulário após o cadastro
      setAuthor('');
      setGenre('');
      setBookName('');
      setPageCount('');
      setSynopsis('');
      setImage(null);
      setPdf(null);
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
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
            <label htmlFor="bookImage" className="form-label">Imagem do livro</label>
            <input type="file" className="form-control" id="bookImage" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="col-12">
            <label htmlFor="bookPdf" className="form-label">Documento PDF</label>
            <input type="file" className="form-control" id="bookPdf" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
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
      )}
    </div>
  );
};

export default Cadastro;
