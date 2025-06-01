import { Link, useNavigate } from "react-router-dom";
import './LoginValidation';
import { useEffect, useState } from 'react'
import Validation from './LoginValidation';
import axios from 'axios';

export default function Login() {
  const [values, setValues] = useState({
    mail: '',
    mdp: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("authToken");
  });
  


  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };
  
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    const noErrors = Object.keys(validationErrors).length === 0;
  
    if (noErrors) {
      axios.post('http://localhost:8081/login', {
        email: values.mail,
        password: values.mdp
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('authToken', res.data.token);
          localStorage.setItem('pseudo', res.data.user.name);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          alert("Compte Inexistant");
        }
      })
      .catch(err => {
        alert("Erreur lors de la connexion");
        navigate('/login');
      });
    }
  };
  

  const loggedOut = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Connexion</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <div className='name1'>Adresse Mail </div>
          <input className='mail' onChange={handleInput}  type='text' name='mail' />
       {errors.mail && <span className="error">{errors.mail}</span>}
          <div className='name2'>Mot de Passe </div>
          <input className='Mdp' type='password' onChange={handleInput} name='mdp' />
          {errors.mdp && <span className="error">{errors.mdp}</span>}
          <Link to='../register'><a className="register"> Pas encore de compte? Inscrivez-vous</a></Link>
          <input className='send' type='submit' value='Envoyer' />
        </label>
      </form>
    </div>
  );
}

//arranger le css, puis le backend, (ajouter des icones?)
