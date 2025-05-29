import { useEffect, useState } from 'react'
import './App.css'

// to do: different temps pour test cps, add animations sur pad quand on click, top record cps et commentaire comme a lancienne (login? ou pas tout depend de mon envie), d'autres modes de jeu/test?, meilleur style graphique (patch bande en haut pourquoi elle bouge desfois quand je clique sur le pad??, add d'autrs btn et infos)

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  let total = count/time;
  let start = false;
  const [timer, setTimer] = useState(0);
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setCount((count) => count + 1); 
    start = true;
    if(animate == true)
    setAnimate(false);
    setTimeout(() => setAnimate(true), 0.05); 
  };
  useEffect(() => {const interval = setInterval(() => { 
    if(start == true) {
      setTime((time) => time+0.01);
      if(time >= timer){
        start = false;
      }
    } 
  },10); return () => clearInterval(interval)},[]);

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
        <button className='fives' onClick={()=> {setTimer(1)}}> 1 s </button>
        <button className='tens' onClick={()=> {setTimer(5)}}> 5 s </button>
        <button className='twentys' onClick={()=> {setTimer(10)}}> 10 s </button>
      </div>
      <p className="footer">
        CPS Test by Kukur091
      </p>
    </>
  )
}

export default App
