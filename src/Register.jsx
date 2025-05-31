import { Link } from "react-router-dom";

export default function Register() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Inscription</h1>
        <form className="form">
          <label>
            <div className='name1'>Adresse Mail </div>
            <input className='mail' type='text' name='mail' />
            <div className='name2'>Pseudo </div>
            <input className='Mdp' type='text' name='name' />
            <div className='name2'>Mot de Passe </div>
            <input className='Mdp' type='password' name='mdp' />
            <div className='name2'>Confirmez votre Mot de Passe </div>
            <input className='Mdp' type='password' name='mdp' />
            <Link to='../login'><a className="register" href=''> Vous avez déjà un compte? Connectez-vous</a></Link>
            <input className='send' type='submit' value='Envoyer' />
          </label>
        </form>
      </div>
    );
  }