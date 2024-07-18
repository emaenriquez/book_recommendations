import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [readBooks, setBooks] = useState([]);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí deberías obtener la información real del usuario basado en el token
      setUser({ username: "usuario" }); // Ajusta esta línea según sea necesario
      fetchReadBooks();
    }
  }, []);

  const fetchReadBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/my_books_read/', {
        method: 'GET',
        headers: {
          Authorization: `Token 4daf245377d9cbb9efe6df19c2ca68beac644cd4`
        }
      });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching read books:", error);
    }
  };

  const addBookToRead = async (book) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/book_read/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          book: book.id 
        })
      });
      setBooks((prevBooks) => {
        if (prevBooks.some(b => b.id === book.id)) {
          return prevBooks;
        }
        return [...prevBooks, book];
      });
    } catch (error) {
      console.error("Error adding book to read:", error);
    }
  };

  const addBookToInterested = (book) => {
    setInterestedBooks((prevBooks) => {
      if (prevBooks.some(b => b.id === book.id)) {
        return prevBooks;
      }
      return [...prevBooks, book];
    });
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    fetchReadBooks(); // Fetch read books on login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setBooks([]); // Clear books on logout
  };

  return (
    <GlobalContext.Provider value={{ 
      readBooks,
      addBookToRead,
      interestedBooks,
      addBookToInterested,
      user,
      login,
      logout 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
