import Header from '../components/Header';
import booksData from '../data/books.json';
import BooksCard from '../components/BooksCard';
import { useEffect, useState } from 'react';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

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
