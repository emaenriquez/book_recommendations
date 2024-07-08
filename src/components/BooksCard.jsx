
const BooksCard = ({ book }) => {
    return (
      <div className="books-card">
        <img src={book.thumbnail} alt="portada" />
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <p>{book.description}</p>
      </div>
    );
  };
  
  export default BooksCard;
  