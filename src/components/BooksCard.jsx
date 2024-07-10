import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/ContextGlobal";

const BooksCard = ({ book }) => {
  const { addBookToRead, readBooks , interestedBooks , addBookToInterested } = useContext(GlobalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isInterestedChecked, setIsInterestedChecked] = useState(false);

  useEffect(() => {
    setIsChecked(readBooks.some((b) => b.id === book.id));
  }, [readBooks, book.id]);

  useEffect(() => {
    setIsInterestedChecked(interestedBooks.some((b) => b.id === book.id));
  },[interestedBooks, book.id])

  const handleCheckboxChange = () => {
    if (!isChecked) {
      addBookToRead(book);
    }
    setIsChecked(!isChecked);
  };

  const hafleCheckboxInterestedChange = () => {
    if (!isInterestedChecked) {
      addBookToInterested(book);
    }
    setIsInterestedChecked(!isInterestedChecked);
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
      <label>
        <input
          type="checkbox"
          checked={isInterestedChecked}
          onChange={hafleCheckboxInterestedChange}
        />
        Marcar interesado
      </label>
    </div>
  );
};

export default BooksCard;
