import "./ModalWin.css"

const ModalWin = ({puntos, preguntasCant, reloaderGame}) => {

  const total = Math.round((puntos * 100) / preguntasCant)
  const winnerText = total===100? "¡Experto!": total>90 ? "¡Excelente!": (total>80)?"¡Muy Bien!": (total>=70)? "¡Bien!":"¡Debes Mejorar!"
  const puntosPartida = JSON.parse(localStorage.getItem('puntos'));

  const handleReload = ()=>{
    reloaderGame()
  }

  return (
    <section className='winner'>
        <div className='text'>
          <h2 style={{fontSize: "40px", color: "rgb(72, 187, 72)"}}>{winnerText} </h2>
          <section className='winnerPoints'>
          <h4 >Obtuviste el:</h4>
          <h2 style={{fontSize: "40px", color: "rgb(255, 255, 63)"}}>{total}%</h2>
          <h4 >de los puntos en:</h4>
          <h2 style={{fontSize: "30px", color: "rgb(255, 255, 63)"}} > {puntosPartida} </h2>
          <h4 >minutos.</h4>
          </section>
            <div className='btnWinner' onClick={handleReload}>Rehacer</div>
            <div className='btnWinner' onClick={()=>{}} >Guardar puntaje</div>
        </div>
      </section>
  )
}

export default ModalWin