import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AlertCards from './AlertCards';



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
        <div className='text-center w-100 d-flex justify-content-center'>
            <form className="form-signin col-lg-4" onSubmit={handleLogin}>

                <h1 className="h3 mb-3 font-weight-normal">Book-Match</h1>
                <input type="email" id="inputEmail" className="form-control" placeholder="login"  value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" id="inputPassword" className="form-control mt-4" placeholder="senha"  value={password} onChange={e => setPassword(e.target.value)} />
                {error && <AlertCards />}
                <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login