import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../utils/auth';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.jpg';

function Header() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const sigOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ height: '71px', backgroundColor: 'black' }}>
                <Link className="navbar-brand" to="/">
                    <img src={logo} style={{ width: '79px',maxHeight:'71px' }} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active d-flex justify-content-center align-items-center" style={{ height: '44px', width: '132px', backgroundColor: '#EFEFEF' }}>
                            <Link className="nav-link" to="/pesquisar">Pesquisar</Link>
                        </li>
                        {user && (
                            <li className="nav-item d-flex mx-3 justify-content-center align-items-center" style={{ height: '44px', width: '132px', backgroundColor: '#EFEFEF' }}>
                                <Link className="nav-link" to="/cadastro">Cadastrar</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav  w-100 d-flex justify-content-end">
                        {user ? (
                            <li className="nav-item mx-5">
                                <button onClick={sigOut} className="btn justify-content-center align-items-center"  style={{ height: '44px', width: '132px', backgroundColor: '#EFEFEF' }} type="button">Sair</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login">
                                    <button className="btn"  style={{ height: '44px', width: '132px', backgroundColor: '#EFEFEF' }} type="button">Login</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;