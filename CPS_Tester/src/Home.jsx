import { useEffect, useState } from 'react'
import './App.css'
import 'reactjs-popup/dist/index.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

// changement de couleur quand on selectionne un temps pour savoir le test se faire sur cbn de temps, top record cps et commentaire comme a lancienne (login? ou pas tout depend de mon envie), d'autres modes de jeu/test?, add d'autrs btn et infos)

function Home() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const total = time > 0 ? count / time : 0;
  const [start, setStart] = useState(false);
  const [timer, setTimer]= useState(5);
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("authToken");
  });
  const [texte, setTexte] = useState('');
  const [scores, setScores] = useState([]);

  const handleChange = (e) => {
    setTexte(e.target.value);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    if(animate == true)
      setAnimate(false);
      setTimeout(() => setAnimate(true), 10);
      if(count == 0)
        setStart(true);
    if(time < timer){
    setCount((count) => count + 1); 
}
  };
    const handleRefresh = () => {
      window.location.reload();
    };

  useEffect(() => {const interval = setInterval(() => { 
    axios.post('http://localhost:8081/logscore')
    .then(res => {
      setScores(res.data); 
    })
    .catch(err => {
      console.error("Erreur lors du chargement des scores", err);
    });

    if(!(time < timer)){
      setStart(false);
      setShowPopup(true);
    }
    if(start) {
      setTime((time) => time+0.0025);
    } 

    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };
  
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
    
  },2.5); return () => clearInterval(interval)},[start, timer, time]);


  const loggedOut = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  const addscore = () => {
    if(isLoggedIn === false){
    navigate("/login");
    } else {
      axios.post('http://localhost:8081/addscore', {user: localStorage.getItem('pseudo'), 
      cps: total, 
      txt: texte}).then(res => {
        window.location.reload();
      }).catch(err => {
        window.location.reload();
      });
    }
  };

  return (
    <>
      <div>
      </div>
      {isLoggedIn?(<button className="Login" onClick={loggedOut}>Déconnexion</button>):(<Link to="./login">
      <button className="Login"> Connexion </button>
      </Link>)}
      <div className="band">
      <h1 className="bandtxt">CPS Test</h1>
      </div>
      <div className="page">
        <button className={`pad`}
       onClick={() => {handleClick()}}>
        <div className={`ustre ${animate ? "click" : ""}`}></div>
        </button>
        <button className='clickcount'> {count} Clicks </button>
        <button className='timer'> {time.toFixed(2)} </button>
        <button className={`cps`}>
          CPS: {total.toFixed(2)}
        </button>
        <button className='fives' onClick={() => setTimer(1)}> 1 s </button>
        <button className='tens' onClick={()=> setTimer(5)}> 5 s </button>
        <button className='twentys' onClick={()=> setTimer(10)}> 10 s </button>
        {showPopup && <button className="popup" >Tu fais : {total.toFixed(2)} CPS, bravo ! 
          <button className="popupbutton" onClick={handleRefresh}>Click ici pour recommencer !</button><input onChange={handleChange} className="popupbutton" name="texte" type='text' defaultValue="Ecrivez ici pour publier"></input><button className="popupbutton" onClick={addscore}>Poster ton score</button></button>}
          {showPopup && <div className='screenfog'></div>}
      </div>
      {scores.slice(-5).reverse().map((score, index) => (
          <li key={index}>
            <strong>{score.user}</strong> - {score.cps} CPS - {score.txt}
          </li>
        ))}
      <p className="footer">
        CPS Test by Kukur091
      </p>
    </>
  )
}

export default Home
