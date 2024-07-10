import { useContext } from "react";
import { GlobalContext } from "../context/ContextGlobal";

function Lecturas() {
  const { readBooks } = useContext(GlobalContext);

  console.log("Libros leídos:", readBooks); // Log para verificar

  return (
    <div>
      <h2>Lecturas</h2>
      {readBooks.length === 0 ? (
        <p>No hay libros leídos</p>
      ) : (
        readBooks.map((book) => (
          <div key={book.id} className="books-card">
            <img src={book.thumbnail} alt="portada" />
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p>{book.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Lecturas;
