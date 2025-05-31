import { Link } from "react-router-dom";
import './LoginValidation';
import { useState } from "react";

export default function Login() {
  const [values, setValues] = useState({
    mail: '',
    mdp: ''
  });

  const [errors, setErrors] = useState({})
  const handleInput = () => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Connexion</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <div className='name1'>Adresse Mail </div>
          <input className='mail' onChange={handleInput}  type='text' name='mail' />
          <div className='name2'>Mot de Passe </div>
          <input className='Mdp' type='password' onChange={handleInput} name='mdp' />
          <Link to='../register'><a className="register"> Pas encore de compte? Inscrivez-vous</a></Link>
          <input className='send' type='submit' value='Envoyer' />
        </label>
      </form>
    </div>
  );
}

//arranger le css, puis le backend, (ajouter des icones?)
