
let apiToken = '4daf245377d9cbb9efe6df19c2ca68beac644cd4'

export const setApiToken = (token) => {
  apiToken = token;
};
// Función para obtener los libros leidos
export const fetchReadBooks = async (userToken) => {
    if (!userToken) {
      console.error("No user token found");
      return [];
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
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error("Error fetching read books:", error);
      return [];
    }
};
// Función para añadir libros a leidos
export const addBookToRead = async (userToken, book) => {
    if (!userToken) {
      console.error("No user token found");
      return null;
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
      return data;
    } catch (error) {
      console.error("Error adding book to read:", error);
      return null;
    }
};
// Función para mostrar los libros de me interesan
export const fetchInterestedBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/my_books_like/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error("Error fetching interested books:", error);
      return [];
    }
};
// Función para añadir libros a me interesan
export const addBookToInterested = async (userToken, book) => {
    if (!userToken) {
      console.error("No user token found");
      return null;
    }
  
    try {
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding book to interested:", error);
      return null;
    }
};

// Función para obtener libros
export const fetchBooks = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/books/', {
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error('Failed to fetch books: ' + data.message);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
// Función para loguear un libro
export const loginUser = async (username, password) => {
  const body = {
    username,
    password
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid username or password.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to login. Please try again later.");
  }
};

// Función para registrar usuarios
export const registerUser = async (username, email, password) => {
  const body = {
    username,
    email,
    password
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.status === 400) {
      const data = await response.json();
      if (data.username && data.username.includes("A user with that username already exists.")) {
        throw new Error("A user with that username already exists.");
      } else {
        throw new Error("Failed to register. Please check your details.");
      }
    } else if (!response.ok) {
      throw new Error("Failed to register. Please try again later.");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Función para calificar un libro
export const rateBook = async (bookId, rating) => {
  try {
    const response = await fetch('http://localhost:8000/api/book_rating/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
      body: JSON.stringify({ book: bookId, rating: rating })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error('Failed to rate book: ' + data.message);
    }
  } catch (error) {
    console.error("Error rating book:", error);
    return null;
  }
};

export const fetchMyBookRatings = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/my_books_rating/', {
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    if (data.status === 'success') {
      // console.log(data.data)
      return data.data;
    } else {
      throw new Error('Failed to fetch book ratings: ' + data.message);
    }
  } catch (error) {
    console.error("Error fetching book ratings:", error);
    return [];
  }
};
