import { useState, useEffect } from 'react';
import '../App.css'
import '../loader.css'
import { SUMERIOS } from '../sumerios';
import confetti from 'canvas-confetti'
import ModalWin from '../components/ModalWin';
import correct from "../Images/correct2.png"
import incorrect from "../Images/incorrect2.png"
import Time from '../components/Time';

function Game() {
  const [shuffledConsignas, setShuffledConsignas] = useState(SUMERIOS.consignas)
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [isCorrect, setIsCorrect] = useState(false);
  const [notCorrect, setNotCorrect] = useState(false);
  const [puntos, setPuntos] = useState(0)
  const [win, setWin] = useState(false)
  const [isReload, setIsReload] = useState(false)
  
  useEffect(() => {
    setShuffledConsignas(SUMERIOS.consignas.sort(() => Math.random() - 0.5))
  }, [])

  const consignasData= shuffledConsignas

  const cantidadPreg = consignasData.length -1
  ///const cantidadPreg = 3
  const image = consignasData[index].img
  const answer =  consignasData[index].answer
  const headerName = name.replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())

  /* function quitarAcentos(palabraConAcentos) {
    return palabraConAcentos.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } */

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [index])

  useEffect(() => {
    if (index === cantidadPreg) {
      setWin(true);
    }
  }, [index, cantidadPreg]);

  const passQuestion = ()=>{
    setNotCorrect(true)
  }

  const nextQuestion= () => {
    setIndex(index +1)
    setIsCorrect(false)
    setNotCorrect(false)
    setName("")
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const reloaderGame =()=>{
    setIndex(0)
    setWin(false)
    setPuntos(0)
    setIsReload(prevState => !prevState)
  } 

  useEffect(() => {
    if (name.toLowerCase().trim() === answer){
      setIsCorrect(true);
      setPuntos(prevPuntos => prevPuntos + 1);
      confetti()
    }else{
      setIsCorrect(false);
    }
  }, [name, index, answer]);

  

  return (
    <>
    <header className='header animate__animated animate__fadeInDown'>
      <h1>{SUMERIOS.title} </h1>
    </header>
    { isLoading ?
      <span className='loader'></span>
      :win?
      <ModalWin puntos={puntos} preguntasCant={cantidadPreg} reloaderGame={reloaderGame} />
      :
      <main className='mainGame'>
        <section className='imageContainer'>
          {
            isCorrect && <img className="respuestaIcon" src={correct} alt="" />

          }
          {
            notCorrect && <img className="respuestaIcon" src={incorrect} alt="" />

          }
          <section className='image'>
            <header className='answerHeader'>
              <h3 className='answerImg'>{headerName}</h3>
            </header>
            <img src={image} alt=""/>
            { 
              (isCorrect || notCorrect) &&
              <div
                className='buttonNext'
                onClick={()=>nextQuestion()}
              >
                <h3>Siguiente</h3>
              </div>
            }
          </section>
        </section>
        <section className='questions'>
          <h3>{consignasData[index].question} </h3>  
        </section>
        <section className='inputs' >
          { 
            (!isCorrect && !notCorrect )&&
            <section >
              <form onSubmit={handleSubmit} className='inputForm'>
                <h3>Respuesta:</h3>
                <input
                  className='input-style'
                  type='text'
                  onChange={(e) =>setName(e.target.value)}
                />
              </form>
            </section>
          }
        </section>
        <section className='menu'>
        <div>
           <h3>{index+1} de {cantidadPreg}</h3>
        </div>
          {
            (!isCorrect && !notCorrect ) &&
          <div
            className='buttonPass'
            onClick={()=>passQuestion()}
          >
            <h3>Pasar</h3>
          </div>
          }
        </section>
      </main>
    }
    <Time win={win} isReload={isReload} />
    </>
  )
}

export default Game