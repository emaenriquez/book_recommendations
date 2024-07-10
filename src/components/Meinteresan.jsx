import { useContext } from "react";
import { GlobalContext } from "../context/ContextGlobal";
function Meinteresan() {

  const { interestedBooks } = useContext(GlobalContext)
  return (
    <div>
      <h2>Me Interesan</h2>
      <p>Contenido de la sección Me Interesan...</p>
      {
        interestedBooks.length === 0 ? (
          <p>No hay libros interesados</p>
        ) : (
          interestedBooks.map((book) => (
            <div key={book.id} className="books-card">
              <img src={book.thumbnail} alt="portada" />
              <h2>{book.title}</h2>
              <h3>{book.subtitle}</h3>
              <p>{book.description}</p>
            </div>
          ))
        )
      }
    </div>
  )
}

export default Meinteresan