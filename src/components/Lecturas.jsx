import { useContext } from "react";
import { GlobalContext } from "../context/ContextGlobal";
import '../styles/Profile.css'

function Lecturas() {
  const { readBooks } = useContext(GlobalContext);

  return (
    <main className="books-list">
      {readBooks.length === 0 ? ( <p>No hay libros leídos</p>) : (
        readBooks.map((book) => (
          <section key={book.id} className="books-card">
            <img src={book.thumbnail} alt="portada" className="books-card__image" />
            <h2 className="books-card__title">{book.title}</h2>
            <h3 className="books-card__subtitle">{book.subtitle}</h3>
            <details className="books-card__details">
                <summary>Haz click para ver la descripción</summary>
                <p className="books-card__description">{book.description}</p>
            </details>
          </section>
        ))
      )}
    </main>
  );
}

export default Lecturas;
