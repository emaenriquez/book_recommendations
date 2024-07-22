import Header from '../components/Header';
import BooksCard from '../components/BooksCard';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(()=> {
    const getBooks = async ( ) => {
      const bookData = await fetchBooks()
      setBooks(bookData)
    }
    getBooks()
  })

  return (
    <>
      <Header />
      <div>
        {books.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Home;
