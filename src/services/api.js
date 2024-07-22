
let apiToken = '4daf245377d9cbb9efe6df19c2ca68beac644cd4'

export const setApiToken = (token) => {
  apiToken = token;
};

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


export const fetchBooks = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/books/', {
      headers: {
        'Authorization': `Token ${apiToken}`,
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

