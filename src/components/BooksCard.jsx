import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/ContextGlobal";

const BooksCard = ({ book }) => {
  const { addBookToRead, readBooks } = useContext(GlobalContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(readBooks.some((b) => b.id === book.id));
  }, [readBooks, book.id]);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      addBookToRead(book);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="books-card">
      <img src={book.thumbnail} alt="portada" />
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <details>
        <summary>Haz click para ver la descripción</summary>
        <p>{book.description}</p>
      </details>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Marcar como leído
      </label>
    </div>
  );
};

export default BooksCard;
