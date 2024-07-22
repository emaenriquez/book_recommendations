import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/ContextGlobal";

const BooksCard = ({ book }) => {
  const { addBookToRead, readBooks, interestedBooks, addBookToInterested, rateBook } = useContext(GlobalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isInterestedChecked, setIsInterestedChecked] = useState(false);
  const [rating, setRating] = useState(book.rating || 0); // Assuming 'book.rating' holds the current rating

  useEffect(() => {
    if (Array.isArray(readBooks)) {
      setIsChecked(readBooks.some((b) => b.id === book.id));
    } else {
      setIsChecked(false);
    }
  }, [readBooks, book.id]);

  useEffect(() => {
    setIsInterestedChecked(interestedBooks.some((b) => b.id === book.id));
  }, [interestedBooks, book.id]);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      addBookToRead(book);
    }
    setIsChecked(!isChecked);
  };

  const handleCheckboxInterestedChange = () => {
    if (!isInterestedChecked) {
      addBookToInterested(book);
    }
    setIsInterestedChecked(!isInterestedChecked);
  };

  const handleRatingChange = async (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);
    await rateBook(book.id, newRating);
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
          onChange={handleCheckboxInterestedChange}
        />
        Marcar interesado
      </label>
      <label>
        Calificación:
        <select value={rating} onChange={handleRatingChange}>
          <option value="0">Selecciona una calificación</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default BooksCard;
