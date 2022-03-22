import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { useContext } from 'react';
import { ModalContext } from 'HOC/GlobalModalProvider';
import AddToBookshelfModal from '../Modal/AddToBookshelfModal/AddToBookshelfModal';
import { useEffect } from 'react';

const StyledBookshelf = styled.table`
  border-collapse: collapse;
  border-spacing: 2px;
  margin: 25px 0;
  font-size: 12px;
  font-family: 'montserrat';

  thead tr {
    text-align: left;
    vertical-align: bottom;
    padding: 12px 5px 5px 0;
    border-bottom: 1px solid #dddddd;
  }
  th,
  td {
    padding: 12px 15px;
  }
  tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  .book_cover {
    img {
      zoom: 0.5;
    }
  }
  .actions button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentFontColor};
    }
  }
`;

const BookshelfGrid = ({ books, columns }) => {
  const [bookList, setBookList] = useState([]);
  const openModal = useContext(ModalContext);

  useEffect(() => {
    setBookList(books);
  }, [books]);

  const toggleModal = (book) => {
    openModal(
      <AddToBookshelfModal
        setIsOpen={openModal}
        title={book.title}
        bookId={book.bookId}
        cover={book.cover}
        author={book.author}
        rating={book.rating}
      />
    );
  };

  return (
    <StyledBookshelf>
      <thead>
        <tr>
          {columns.map((column) => {
            return <th key={column.name}>{column.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {bookList.map((book) => {
          return (
            <tr key={book.bookId}>
              {columns.map((column) => {
                switch (column.dataKey) {
                  case 'cover':
                    return (
                      <td className={'book_cover'} key={`${column.dataKey}${book.bookId}`}>
                        <Link to={`/book/${book.bookId}`}>
                          <img src={book[column.dataKey]} alt={'book cover'}></img>
                        </Link>
                      </td>
                    );
                  case 'actions':
                    return (
                      <td className={'actions'} key={`${column.dataKey}${book.bookId}`}>
                        <button onClick={() => toggleModal(book)}>
                          <FiEdit />
                        </button>
                      </td>
                    );
                  default:
                    return <td key={`${column.dataKey}${book.bookId}`}>{book[column.dataKey]}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledBookshelf>
  );
};
export default BookshelfGrid;
