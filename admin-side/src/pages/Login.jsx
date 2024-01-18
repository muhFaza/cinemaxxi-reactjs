import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import '../assets/custom.css'
function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  })

  function loginForm (e) {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    })
  }
  
  const navigate = useNavigate()
  async function loginSubmit (e) {
    try {
      e.preventDefault()
      const res = await fetch('http://localhost:3000/admin/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginState)
      })
      if (!res.ok) throw {name: 'loginError', message: 'Failed to login'}
      const access_token = await res.json()
      localStorage.access_token = access_token.access_token
      
      toast.success("success login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      navigate('/')
      
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
    <div className="login-section" id="login-section">
    <div className="container" style={{maxWidth: '520px', minWidth: '310px'}}>
      <div className="card" style={{height: '100%', backgroundColor: '#2b2b2b4b', backdropFilter: 'blur(10px)'}}>
        <form onSubmit={loginSubmit} action="" className="h-100 d-flex flex-column justify-content-evenly mx-3">
          <div>
            <h1 className="mx-2" style={{color: '#b1b1b1', fontSize: '35px', textWrap: 'nowrap'}}><span style={{fontFamily: 'ZaraFont', fontSize: '50px', color: '#ffffff', marginRight: '1rem'}}>Zara</span>Login</h1>
          </div>
          <div className="form-group">
            <input onChange={loginForm} name="email" className="form-control" placeholder="Email Address" type="email" id="email-login" autoComplete='email' required />
          </div>
          <br />
          <div className="form-group">
            <input onChange={loginForm} className="form-control" placeholder="Password" type="password" name="password" id="password-login" autoComplete='current-password' required />
          </div>
          <span className="text-danger small"></span>
          <div className="separator">OR</div>
          <div id="buttonDiv" className="mt-3"></div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember-login" />
            <label htmlFor='remember-login' className="form-check-label" style={{color: '#e1e1e1', textWrap: 'nowrap'}}>Remember me</label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn" style={{backgroundColor: '#e1e1e1'}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    </>
  )
}

export default Login
