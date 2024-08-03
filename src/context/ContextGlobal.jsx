import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  fetchReadBooks,
  addBookToRead,
  fetchInterestedBooks,
  addBookToInterested,
  rateBook,
  fetchMyBookRatings
}
  from '../services/api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [readBooks, setBooks] = useState([]);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [bookRatings, setBookRatings] = useState([]);

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

  // Uso de rateBook en GlobalProvider
  const handleRateBook = useCallback(async (bookId, rating) => {
    const rateBookResponse = await rateBook(bookId, rating);
    if (rateBookResponse) {
      // Puedes manejar la respuesta aquí si es necesario
      console.log("Book rated successfully:", rateBookResponse);
    } else {
      console.error("Failed to rate book");
    }
  }, [userToken]);

  const handleFetchMyBookRatings = useCallback(async () => {
    const ratings = await fetchMyBookRatings();
    setBookRatings(ratings);
  }, [userToken]);

  useEffect(() => {
    const storedUserToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user'); // Cargar los datos del usuario
    if (storedUserToken) {
      setUserToken(storedUserToken);
      setUser(JSON.parse(storedUserData)); // Parsear los datos del usuario y establecer el estado
      handleFetchReadBooks();
      handleFetchInterestedBooks();
      handleFetchMyBookRatings();
    }
  }, [handleFetchReadBooks, handleFetchInterestedBooks, handleFetchMyBookRatings]);
  
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Almacenar los datos del usuario
    setUserToken(token);
    setUser(userData);
    handleFetchReadBooks();
    handleFetchInterestedBooks();
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remover los datos del usuario
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
      bookRatings,
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
