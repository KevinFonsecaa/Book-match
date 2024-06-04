import React from 'react';
import logo from '../img/logo.png';
import passaro from '../img/passaro.png';

function Home() {
    return (
        <main className='d-flex flex-column' >

            <div className='d-flex justify-content-center align-items-center h-100 mt-5 position-relative'>
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <img src={passaro} className='mt-5' style={{ width: '465px', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} alt="Passaro" />
                    <h3 className='mx-5'>Encontre o livro perfeito para você</h3>
                </div>
                <img src={logo} style={{ height: '118px', width: '132px', zIndex: 2 }} alt="Logo" />
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h3 className='mx-5'>Em apenas alguns clicks</h3>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
            <img src={passaro} style={{width: '465px'}} alt="Logo" />
            </div>
        </main>
    );
}

export default Home;