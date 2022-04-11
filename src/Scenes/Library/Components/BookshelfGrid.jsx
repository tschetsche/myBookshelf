import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { useContext } from 'react';
import { ModalContext } from 'HOC/GlobalModalProvider';
import AddToBookshelfModal from '../../../Components/Modal/AddToBookshelfModal/AddToBookshelfModal';
import { useEffect } from 'react';
import ReadMoreTableCell from './ReadMoreTableCell';
import def from 'assets/images/default.png';
import up from 'assets/images/up_arrow.png';
import down from 'assets/images/down_arrow.png';

const StyledBookshelfGrid = styled.table`
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
    th {
      vertical-align: middle;
      padding: 12px 25px 12px 15px;
      white-space: nowrap;
    }
  }

  th,
  td {
    text-align: left;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
    td {
      vertical-align: top;
      padding: 12px 15px;
    }
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
  [class$='column_sortable'] {
    &:hover {
      color: ${(props) => props.theme.accentFontColor};
      cursor: default;
    }
  }
  .review_column_sortable,
  .notes_column_sortable {
    width: 20%;
  }

  .default,
  .up,
  .down {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center right;
  }

  .default {
    background-image: url(${def});
  }

  .up {
    background-image: url(${up});
  }

  .down {
    background-image: url(${down});
  }
`;

const BookshelfGrid = ({ books, columns, defaultSortKey }) => {
  const [bookList, setBookList] = useState(books);
  const [sortDirection, setSortDirection] = useState(1);
  const [sortField, setSortField] = useState(defaultSortKey);
  const openModal = useContext(ModalContext);

  useEffect(() => {
    setBookList(books);
  }, [books]);

  const sortTable = (table) => {
    const newTable = [...table];
    newTable.sort((a, b) => {
      return a[sortField] > b[sortField] ? sortDirection : -1 * sortDirection;
    });
    return newTable;
  };

  useEffect(() => {
    setBookList(sortTable(bookList));
  }, [sortField, sortDirection]);

  const handleGridSort = (fieldKey) => () => {
    if (fieldKey !== sortField) {
      setSortField(fieldKey);
      setSortDirection(1);
    } else {
      setSortDirection(-1 * sortDirection);
    }
  };

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

  const getHeaderClassName = (name, fieldKey) => {
    const baseClassName = `${name}_column_sortable`;
    if (fieldKey !== sortField) {
      return `${baseClassName} default`;
    }
    return sortDirection > 0 ? `${baseClassName} up` : `${baseClassName} down`;
  };

  return (
    <StyledBookshelfGrid>
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th
                key={column.name}
                onClick={column.isSortable ? handleGridSort(column.dataKey) : undefined}
                className={column.isSortable ? getHeaderClassName(column.name, column.dataKey) : `${column.name}_column`}
              >
                {column.name}
              </th>
            );
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
                  case 'notes':
                  case 'review':
                    return (
                      <td key={`${column.dataKey}${book.bookId}`}>
                        <ReadMoreTableCell cellText={book[column.dataKey]} />
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
    </StyledBookshelfGrid>
  );
};
export default BookshelfGrid;
