import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/ContextGlobal";
import '../styles/BooksCard.css'
const BooksCard = ({ book, ratingProps}) => {
  const { addBookToRead, readBooks, interestedBooks, addBookToInterested, rateBook } = useContext(GlobalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isInterestedChecked, setIsInterestedChecked] = useState(false);
  const [rating, setRating] = useState(book.rating || 0);

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
    <section className="books-card">
      <img src={book.thumbnail} alt="portada" className="books-card__image" />
      <h2 className="books-card__title">{book.title}</h2>
      <h3 className="books-card__subtitle">{book.subtitle}</h3>
      <p className="books-card__rating">Rating: {ratingProps}</p>
      <details className="books-card__details">
        <summary>Haz click para ver la descripción</summary>
        <p>{book.description}</p>
      </details>
      
      <label className="books-card__checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="books-card__checkbox"
        />
        Marcar como leído
      </label>
      
      <label className="books-card__checkbox-label">
        <input
          type="checkbox"
          checked={isInterestedChecked}
          onChange={handleCheckboxInterestedChange}
          className="books-card__checkbox"
        />
        Marcar interesado
      </label>
      
      <label className="books-card__rating-label">
        <select
          value={rating}
          onChange={handleRatingChange}
          className="books-card__rating-select"
        >
          <option value="0">Selecciona una calificación</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    
    </section>
  );
};

export default BooksCard;
