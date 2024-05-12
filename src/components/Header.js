import React from 'react'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/pesquisar" >Pesquisar Livros</Link>
                        </li>
                    </ul>
                    <form className="form-inline" style={{marginLeft:'80%'}}>

                    <Link  to="/login" > <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login Master</button></Link>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header