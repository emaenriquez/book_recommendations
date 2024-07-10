import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [readBooks, setBooks] = useState([]);

  const addBookToRead = (book) => {
    console.log("Adding book:", book); // Log para verificar
    setBooks((prevBooks) => {
      // Evitar duplicados
      if (prevBooks.some(b => b.id === book.id)) {
        return prevBooks;
      }
      return [...prevBooks, book];
    });
  };

  return (
    <GlobalContext.Provider value={{ readBooks, addBookToRead }}>
      {children}
    </GlobalContext.Provider>
  );
};
