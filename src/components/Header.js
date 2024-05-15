import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../utils/auth';
import { auth } from '../utils/firebase';
import {signOut} from 'firebase/auth'
import { useNavigate } from "react-router-dom";

function Header() {

    const { user} = useContext(AuthContext);
    const navigate = useNavigate();
    const sigOut = async () => {

        try {
            await signOut(auth);
            return navigate("/");

        } catch (error) {

        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link className="navbar-brand" to="/" >Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/pesquisar" >Pesquisar</Link>
                        </li>
                        {user ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/cadastro" >Cadastrar</Link>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>
                    <form className="form-inline" style={{ marginLeft: '80%' }}>
                    {user ? (

                        <button onClick={sigOut} className="btn btn-outline-success my-2 my-sm-0" type="button">Sair</button>

                        ) : (
                            <Link to="/login" > <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button></Link>
                        )}

                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header