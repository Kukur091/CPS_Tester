import { useEffect, useState } from 'react'
import './App.css'
import 'reactjs-popup/dist/index.css';

// changement de couleur quand on selectionne un temps pour savoir le test se faire sur cbn de temps, top record cps et commentaire comme a lancienne (login? ou pas tout depend de mon envie), d'autres modes de jeu/test?, add d'autrs btn et infos)

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const total = time > 0 ? count / time : 0;
  const [start, setStart] = useState(false);
  const [timer, setTimer]= useState(5);
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
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
    if(!(time < timer)){
      setStart(false);
      setShowPopup(true);
    }
    if(start) {
      setTime((time) => time+0.0025);
    } 
    
  },2.5); return () => clearInterval(interval)},[start, timer, time]);

  return (
    <>
      <div>
      </div>
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
          <button className="popupbutton" onClick={handleRefresh}>Click ici pour recommencer !</button></button>}
          {showPopup && <div className='screenfog'></div>}
      </div>
      <p className="footer">
        CPS Test by Kukur091
      </p>
    </>
  )
}

export default App
