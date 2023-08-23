import "./ModalWin.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { collection, getFirestore, addDoc } from "firebase/firestore";

const ModalWin = ({puntos, preguntasCant, reloaderGame}) => {

  const db = getFirestore();
  const ordersCollection = collection(db, "points");

  const [playerName, setPlayerName] = useState("")
  ///const [playerCourse, setPlayerCourse] = useState("")
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);

  const total = Math.round((puntos * 100) / preguntasCant)
  const winnerText = total===100? "¡Experto!": total>90 ? "¡Excelente!": (total>80)?"¡Muy Bien!": (total>=70)? "¡Bien!":"¡Debes Mejorar!"
  const minutos = JSON.parse(localStorage.getItem('minutos'));
  const segundos = JSON.parse(localStorage.getItem('segundos'));

  useEffect(() => {
    if(playerName === ""){
      setBotonDeshabilitado(true)
    }else{
      setBotonDeshabilitado(false)
    }
  }, [playerName])

  const order = { 
    playerName:playerName, 
    //playerCourse:playerCourse, 
    total:total, 
    minutos:minutos,
    segundos:segundos 
  };
  console.log(order)
  const confirmSubmit =  async() => {
    try {
      await addDoc(ordersCollection, order);
      console.log('Documento agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el documento:', error);
    }
  };
  const handleReload = ()=>{
    reloaderGame()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='winner'>
        <div className='text'>
          <h2 style={{fontSize: "40px", color: "rgb(72, 187, 72)"}}>{winnerText} </h2>
          <section className='winnerPoints'>
          <h4 >Obtuviste el:</h4>
          <h2 style={{fontSize: "40px", color: "rgb(255, 255, 63)"}}>{total}%</h2>
          <h4 >de los puntos en:</h4>
          <h2 style={{fontSize: "30px", color: "rgb(255, 255, 63)"}} > {`${minutos}:${segundos}`} </h2>
          <h4 >minutos.</h4>
          </section>
            <div className='btnWinner' onClick={handleReload}>Rehacer</div>
              <form onSubmit={handleSubmit} className="inputFormModal">
                <h3 style={{textAlign:"center"}}>Nombre:</h3>
                <input
                  className='input-style'
                  type='text'
                  onChange={(e) =>setPlayerName(e.target.value)}
                />
                {/* <h3 style={{textAlign:"center"}}>Curso:</h3>
                <select className='input-style' id="opciones" value={playerCourse} onChange={(e) =>setPlayerCourse(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="1ero 2">1ero 2</option>
                  <option value="1ero 3">1ero 3</option>
                </select> */}
              </form>
              <Link to={botonDeshabilitado || "/" }className="linkWithoutStyles">
                <div className='btnWinner' onClick={()=>{!botonDeshabilitado && confirmSubmit()}} disabled={botonDeshabilitado} >Guardar puntaje</div>
              </Link>
              <Link to="/" className="linkWithoutStyles">
                <div className='btnWinnerExit' >Salir</div>
              </Link>
        </div>
      </section>
  )
}

export default ModalWin