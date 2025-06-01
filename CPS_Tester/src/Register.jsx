import { Link, useNavigate } from "react-router-dom";
import './SignupValidation';
import { useState } from "react";
import Validation from './SignupValidation';
import axios from 'axios';

export default function Register() {
    const [values, setValues] = useState({
        name: '',
        mail: '',
        mdp: '',
        confirmmdp: ''
      });
    
      const [errors, setErrors] = useState({})
      const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
      };

      const navigate = useNavigate();
      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
          axios.post('http://localhost:8081/register', {
            name: values.name,
            email: values.mail,
            password: values.mdp
          })
          .then(res => {
            navigate('/');
          })
          .catch(err => {
            navigate('/register');
          });
      };
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Inscription</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <div className='name1'>Adresse Mail </div>
            <input className='mail' type='text' onChange={handleInput} name='mail' />
            {errors.mail && <span className="error">{errors.mail}</span>}
            <div className='name2'>Pseudo </div>
            <input className='Mdp' type='text' onChange={handleInput} name='name' />
            {errors.name && <span className="error">{errors.name}</span>}
            <div className='name2'>Mot de Passe </div>
            <input className='Mdp' type='password' onChange={handleInput} name='mdp' />
            {errors.mdp && <span className="error">{errors.mdp}</span>}
            <div className='name2'>Confirmez votre Mot de Passe </div>
            <input className='Mdp' type='password' onChange={handleInput} name='confirmmdp' />
            {errors.confirmmdp && <span className="error">{errors.confirmmdp}</span>}
            <Link to='../login'><a className="register" href=''> Vous avez déjà un compte? Connectez-vous</a></Link>
            <input className='send' type='submit' value='Envoyer' />
          </label>
        </form>
      </div>
    );
  }