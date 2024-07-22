import Header from '../components/Header';
import BooksCard from '../components/BooksCard';
import { useEffect, useState, useContext } from 'react';
import { fetchBooks } from '../services/api';
import { GlobalContext } from '../context/ContextGlobal';

const Home = () => {
  const [books, setBooks] = useState([]);

  const { rateBook } = useContext(GlobalContext)

  useEffect(()=> {
    const getBooks = async ( ) => {
      const bookData = await fetchBooks()
      setBooks(bookData)
    }
    getBooks()
  },[])

  const handleRate = async (bookId, rating) => {
    await rateBook(bookId, rating);
  };

  return (
    <>
      <Header />
      <div>
        {books.map((book) => (
          <BooksCard key={book.id} book={book} onRate={handleRate}  />
        ))}
      </div>
    </>
  );
};

export default Home;
