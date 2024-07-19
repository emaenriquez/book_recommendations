import Header from '../components/Header';
import BooksCard from '../components/BooksCard';
import { useEffect, useState } from 'react';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books/',{
      headers: {
        'Authorization': `Token 4daf245377d9cbb9efe6df19c2ca68beac644cd4`,
      }
    }).then(response => response.json()).then(data =>{
      if(data.status === 'success'){
        setBooks(data.data)
      } else {
        console.error('Failed to fetch books:', data.message);
      }
    }).catch(error => console.error('Error fetching books:', error));
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
