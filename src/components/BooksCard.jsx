
const BooksCard = ({ book }) => {
    return (
      <div className="books-card">
        <img src={book.thumbnail} alt="portada" />
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <details>
          <summary>haz click para ver la descripción</summary>
          <p>{book.description}</p>
        </details>
      </div>
    );
  };
  
  export default BooksCard;
  