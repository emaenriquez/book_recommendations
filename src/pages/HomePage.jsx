import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/ContextGlobal';
import BooksCard from '../components/BooksCard';
import Header from '../components/Header';
import { fetchBooks } from '../services/api';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { bookRatings } = useContext(GlobalContext); // Obtener las calificaciones del contexto

  useEffect(() => {
    const getBooks = async () => {
      const bookData = await fetchBooks();
      setBooks(bookData);
    }
    getBooks();
  }, []);

  return (
    <>
      <Header />
      <main className="books-container">
        {books.map((book) => {
          const rating = bookRatings.find(r => r.book === book.id)?.rating || 0; // Obtener calificación del libro
          return (
            <BooksCard key={book.id} book={book} ratingProps={rating} />
          );
        })}
      </main>
    </>
  );
};

export default Home;
