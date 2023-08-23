import { Link } from "react-router-dom";
import "./MainGame.css"
import "./PointsGame.css"
import { getFirestore,  getDocs, collection, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import oro from "../Images/oro3.png"
import plata from "../Images/plata3.png"
import bronce from "../Images/bronce3.png"

const PointsGame = () => {
  const [data,setData] = useState(undefined)
  useEffect(() => {
    const db = getFirestore();
    const productCollection = collection(db, "points");
    const sortedQuery = query(productCollection, orderBy("total", "desc")); 
    getDocs(sortedQuery)
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        products.sort(compareDocuments)
        setData(products);
      })
      .catch((error) => {
        console.error('Error al obtener los documentos:', error);
      });
  }, []);

  const compareDocuments = (doc1, doc2) => {
    if (doc1.total !== doc2.total) {
      return doc2.total - doc1.total; // Ordenar de mayor a menor por total
    } else if (doc1.minutos !== doc2.minutos) {
      return doc1.minutos - doc2.minutos; // Ordenar de menor a mayor por minutos
    } else {
      return doc1.segundos - doc2.segundos; // Ordenar de menor a mayor por segundos
    }
  };

  return (
    <>
    <header className='mainTitle animate__animated animate__fadeInDown' style={{textAlign:"center"}}>
      <h1>Mesopotamia</h1>
    </header>
    <main className='mainGame'>
        <article className="modalPoints">
          {
            data?
            <table className="styled-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Total</th>
                  <th>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((document, index) => (
                  <tr key={index} style={index === 0? {color:"yellow", fontSize:"20px"}:index === 1?{color:"#d1d1d1", fontSize:"20px"}:index === 2?{color:"#e97d35", fontSize:"20px"}:{}} className="rowPoints">
                    <td>
                    {index === 0? <img className="winIcon" src={oro} alt="" />
                      :index === 1? <img className="winIcon" src={plata} alt="" />:index === 2? <img className="winIcon" src={bronce} alt="" />: index +1}
                    </td>
                    <td>{document.playerName}</td>
                    <td>{document.total}%</td>
                    <td>{`${document.minutos}:${document.segundos}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <h1 style={{textAlign:"center"}}>Cargando...</h1> 
          }
        </article>
          <Link to="/" className="linkWithoutStyles">
            <div className="btnMain" >Volver
            </div>
          </Link>
    </main>
    </>
  )
}

export default PointsGame