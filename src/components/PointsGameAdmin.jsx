import { Link } from "react-router-dom";
import "./MainGame.css"
import "./PointsGame.css"
import { getFirestore,  getDocs, collection, doc, query, orderBy, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const PointsGameAdmin = () => {
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

  const handleDelete = (documentId) => {
    const db = getFirestore();
    const productCollection = doc(db, 'points', documentId);
  
    deleteDoc(productCollection)
      .then(() => {
        console.log('Documento eliminado con éxito.');
        // Actualiza el estado de los documentos para reflejar el cambio
        setData(data.filter((doc) => doc.id !== documentId));
      })
      .catch((error) => {
        console.error('Error al eliminar el documento:', error);
      });
  };

  return (
    <>
    <header className='mainTitle animate__animated animate__fadeInDown'>
      <h1>Mesopotamia </h1>
    </header>
    <main className='mainGame'>
        <article className="modalPoints">
            <table className="styled-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Total</th>
                  <th>Tiempo</th>
                  <th>X</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((document, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{document.playerName}</td>
                    <td>{document.total}%</td>
                    <td>{`${document.minutos}:${document.segundos}`}</td>
                    <td>
                    <button onClick={() => handleDelete(document.id)}>Eliminar</button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </article>
          <Link to="/" className="linkWithoutStyles">
            <div className="btnMain" >Volver
            </div>
          </Link>
    </main>
    </>
  )
}

export default PointsGameAdmin