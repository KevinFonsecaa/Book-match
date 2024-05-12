import React from 'react'

function Login() {
    return (
       <div className='text-center w-100 d-flex justify-content-center'>
         <form className="form-signin col-lg-4">
        
        <h1 className="h3 mb-3 font-weight-normal">Book-Match</h1>
        <label for="inputEmail" className="sr-only">Login</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="login" required autofocus />
        <label for="inputPassword" className="sr-only">Senha</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="senha" required />
        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">login</button>
    </form>
       </div>
    )
}

export default Login