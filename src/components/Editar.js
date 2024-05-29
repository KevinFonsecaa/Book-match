import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { firestore } from '../utils/firebase';
import '../index.css';  // Importe o arquivo CSS onde as animaÃ§Ãµes estÃ£o definidas

const Editar = () => {
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [bookName, setBookName] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [booklink, setBookLink] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const docRef = doc(firestore, 'Livros', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const bookData = docSnap.data();
                    setAuthor(bookData.autor);
                    setGenre(bookData.genero);
                    setBookName(bookData.nomeLivros);
                    setPageCount(bookData.qtdPaginas);
                    setSynopsis(bookData.descricao);
                    setImage(bookData.imageUrl);
                    setBookLink(bookData.link);
                } else {
                    setError('Livro não encontrado.');
                }
            } catch (err) {
                console.error("Error fetching book:", err);
                setError('Erro ao buscar os dados do livro.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (pdf && pdf.type !== 'application/pdf') {
            setError('Por favor, selecione um arquivo PDF válido.');
            return;
        }

        if (image && image instanceof File && !image.type.startsWith('image/')) {
            setError('Por favor, selecione um arquivo de imagem válido.');
            return;
        }
        setLoading(true);

        const docRef = doc(firestore, 'Livros', id);
        const updates = {
            autor: author,
            genero: genre,
            nomeLivros: bookName,
            qtdPaginas: pageCount,
            descricao: synopsis,
            link:booklink
        };
        const storage = getStorage();
        try {
            if (image && image instanceof File) {
                const imageRef = ref(storage, `images/${id}/${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                updates.imageUrl = imageUrl;
            }

            if (pdf && pdf.type === 'application/pdf') {
                const pdfRef = ref(storage, `pdfs/${id}/${pdf.name}`);
                await uploadBytes(pdfRef, pdf);
                const pdfUrl = await getDownloadURL(pdfRef);
                updates.pdfUrl = pdfUrl;
            }

            await updateDoc(docRef, updates);
            setMessage('Livro atualizado com sucesso.');
            setAlert('success');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);

        } catch (err) {
            setMessage('Erro ao atualizar o livro.');
            setAlert('danger');
        } finally {
            setLoading(false);
        }
    };

    const displayImage = () => {
        if (typeof image === 'string') {
            return image;
        } else if (image instanceof File) {
            return URL.createObjectURL(image);
        } else {
            return '';
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
                <>
                    <div className='d-flex justify-content-between'>
                        <div className='col-lg-3 mt-5' style={{ 'maxWidth': 210, 'height': 'auto' }}>
                            <img src={displayImage()} className="card-img-top" alt={'a'} />
                        </div>

                        {showAlert && (
                            <div className={`alert alert-${alert} col-lg-3 mt-3 alert-slide-in ${!showAlert && 'alert-slide-out'}`} style={{ 'height': 60 }} role='alert'>
                                <p>{message}</p>
                            </div>
                        )}
                    </div>
                    <form className='row g-3 justify-content-center mt-3' onSubmit={handleSubmit}>
                        <div className="col-12 col-md-6">
                            <label htmlFor="bookName" className="form-label">Nome do livro</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bookName"
                                placeholder="Ex: O hobbit"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="authorName" className="form-label">Nome do autor</label>
                            <input
                                type="text"
                                className="form-control"
                                id="authorName"
                                placeholder="Ex: Tolkien"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="bookGenre" className="form-label">Gênero</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bookGenre"
                                placeholder="Ex: Fantasia"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="pageNumber" className="form-label">Número de páginas</label>
                            <input
                                type="number"
                                className="form-control"
                                id="pageNumber"
                                placeholder="Ex: 150"
                                value={pageCount}
                                onChange={(e) => setPageCount(e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="synopsis" className="form-label">Sinopse</label>
                            <textarea
                                className="form-control"
                                id="synopsis"
                                rows="3"
                                placeholder="Ex: Em uma terra fantÃ¡stica e Ãºnica, um hobbit..."
                                value={synopsis}
                                onChange={(e) => setSynopsis(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="bookImage" className="form-label">Imagem do livro</label>
                            <input
                                type="file"
                                className="form-control"
                                id="bookImage"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="bookPdf" className="form-label">Documento PDF</label>
                            <input
                                type="file"
                                className="form-control"
                                id="bookPdf"
                                accept="application/pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                            />
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
                                Atualizar
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Editar;
