import React, { createContext, useState, useEffect, useCallback } from "react";
import { 
  fetchReadBooks, 
  addBookToRead, 
  fetchInterestedBooks, 
  addBookToInterested, 
  rateBook, 
  fetchMyBookRatings } 
from '../services/api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [readBooks, setBooks] = useState([]);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const handleFetchReadBooks = useCallback(async () => {
    const books = await fetchReadBooks(userToken);
    setBooks(books);
  }, [userToken]);

  const handleAddBookToRead = useCallback(async (book) => {
    const newBook = await addBookToRead(userToken, book);
    if (newBook) {
      setBooks((prevBooks) => {
        if (prevBooks.some(b => b.id === book.id)) {
          return prevBooks;
        }
        return [...prevBooks, book];
      });
    }
  }, [userToken]);

  const handleFetchInterestedBooks = useCallback(async () => {
    const books = await fetchInterestedBooks();
    setInterestedBooks(books);
  }, []);

  const handleAddBookToInterested = useCallback(async (book) => {
    const newBook = await addBookToInterested(userToken, book);
    if (newBook) {
      setInterestedBooks((prevBooks) => {
        if (prevBooks.some(b => b.id === book.id)) {
          return prevBooks;
        }
        return [...prevBooks, book];
      });
    }
  }, [userToken]);

  const handleRateBook = useCallback(async ( bookId,Rating ) => {
    const rateBook = await rateBook(bookId,Rating)
  },[userToken])

  const handleFetchMyBookRatings = useCallback( async () => {
    const ratings = await fetchMyBookRatings();
  },[userToken])

  useEffect(() => {
    const storedUserToken = localStorage.getItem('token');
    if (storedUserToken) {
      setUserToken(storedUserToken);
      handleFetchReadBooks();
      handleFetchInterestedBooks();
      handleFetchMyBookRatings()
    }
  }, [handleFetchReadBooks, handleFetchInterestedBooks,handleFetchMyBookRatings]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUserToken(token);
    setUser(userData);
    handleFetchReadBooks();
    handleFetchInterestedBooks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    setUser(null);
    setBooks([]);
    setInterestedBooks([]);
  };

  return (
    <GlobalContext.Provider value={{
      readBooks,
      interestedBooks,
      user,
      userToken,
      login,
      logout,
      fetchReadBooks: handleFetchReadBooks,
      fetchInterestedBooks: handleFetchInterestedBooks,
      addBookToRead: handleAddBookToRead,
      addBookToInterested: handleAddBookToInterested,
      rateBook: handleRateBook,
      fetchMyBookRatings: handleFetchMyBookRatings,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
