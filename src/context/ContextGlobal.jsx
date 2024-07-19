import React, { createContext, useState, useEffect, useCallback } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [readBooks, setBooks] = useState([]);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [apiToken] = useState('4daf245377d9cbb9efe6df19c2ca68beac644cd4');

  const fetchReadBooks = useCallback(async () => {
    if (!userToken) {
      console.error("No user token found");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/my_books_read/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching read books:", error);
    }
  }, [apiToken, userToken]);

  const addBookToRead = useCallback(async (book) => {
    if (!userToken) {
      console.error("No user token found");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/book_read/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book: book.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBooks((prevBooks) => {
        if (prevBooks.some(b => b.id === book.id)) {
          return prevBooks;
        }
        return [...prevBooks, book];
      });
    } catch (error) {
      console.error("Error adding book to read:", error);
    }
  }, [apiToken, userToken]);

  const fetchInterestedBooks = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/my_books_like/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setInterestedBooks(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching interested books:", error);
    }
  }, [apiToken]);

  const addBookToInterested = useCallback(async (book) => {
    try {
      if (!userToken) {
        console.error("No se encontró el token de usuario");
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/book_like/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book: book.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      setInterestedBooks((prevBooks) => {
        if (prevBooks.some(b => b.id === book.id)) {
          return prevBooks;
        }
        return [...prevBooks, book];
      });
    } catch (error) {
      console.error("Error adding book to interested:", error);
    }
  }, [apiToken]);

  useEffect(() => {
    const storedUserToken = localStorage.getItem('token');
    if (storedUserToken) {
      setUserToken(storedUserToken);
      fetchReadBooks();
      fetchInterestedBooks();
    }
  }, [fetchReadBooks, fetchInterestedBooks]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUserToken(token);
    setUser(userData);
    fetchReadBooks();
    fetchInterestedBooks();
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
      addBookToRead,
      interestedBooks,
      addBookToInterested,
      user,
      userToken,
      login,
      logout,
      fetchReadBooks,
      fetchInterestedBooks,
      addBookToInterested
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
