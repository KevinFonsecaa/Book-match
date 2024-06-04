import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import passaro from '../img/passaro.png';
import AlertCards from './AlertCards';
import './Login.css'; // Certifique-se de criar este arquivo

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return navigate("/cadastro");
        } catch (error) {
            setError("Failed to login: " + error.message);
        }
    };

    return (
        <div className='login-container'>
            <img src={passaro} className="passaro-img-left" alt="Passaro" />
            <div className='text-center w-100 d-flex justify-content-center'>
                <form className="form-signin col-lg-4" onSubmit={handleLogin}>
                    <div className='mt-3 mb-3'>
                        <img src={logo} className="logo-img" alt="Logo" />
                    </div>
                    <input type="email" id="inputEmail" className="form-control" placeholder="login" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" id="inputPassword" className="form-control mt-4" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <AlertCards />}
                    <button className="btn btn-lg btn-dark btn-block mt-4" style={{ height: '50px', width: '132px' }} type="submit">Entrar</button>
                </form>
            </div>
            <img src={passaro} className="passaro-img-right" alt="Passaro" />
        </div>
    );
}

export default Login;