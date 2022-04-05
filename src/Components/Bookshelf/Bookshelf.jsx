import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBookshelfById } from '../../store/selectors/bookshelf';
import { BsFillGridFill, BsListUl } from 'react-icons/bs';
import BookshelfList from './BookshelfList';
import BookshelfGrid from './BookshelfGrid';
import styled from 'styled-components';
import { formatISOString } from '../../util/dateUtil';

const BOOKSHELF_TABLE_COLUMNS = [
  { name: 'cover', dataKey: 'cover', isSortable: false },
  { name: 'title', dataKey: 'title', isSortable: true },
  { name: 'author', dataKey: 'author', isSortable: true },
  {
    name: 'rating',
    dataKey: 'rating',
    isSortable: true,
  },
  {
    name: 'review',
    dataKey: 'review',
    isSortable: true,
  },
  {
    name: 'notes',
    dataKey: 'notes',
    isSortable: true,
  },
  {
    name: 'date started',
    dataKey: 'startDate',
    isSortable: true,
  },
  {
    name: 'date ended',
    dataKey: 'endDate',
    isSortable: true,
  },
  {
    name: 'last modified',
    dataKey: 'dateModified',
    isSortable: true,
  },
  {
    name: '',
    dataKey: 'actions',
    isSortable: false,
  },
];

const StyledBookshelf = styled.div`
  width: 980px;
  position: relative;
  margin: 0 auto;
  height: auto;
  box-sizing: border-box;
  .bookshelf_view {
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0px 6px 0px 6px;
      padding: 6px 7px;
      border: none;
      background-color: #fff;
      &.active {
        border: 1px solid #ccc;
        .control_icon {
          color: #ccc;
        }
      }
      &:hover {
        color: ${(props) => props.theme.accentFontColor};
      }
      .control_icon {
        font-size: 13px;
      }
    }
  }
`;

const Bookshelf = ({ bookshelfId }) => {
  const [isListView, setIsListView] = useState(true);

  const books = useSelector((store) => selectBookshelfById(store, bookshelfId));

  if (!books) {
    return <div>No books found for this bookshelf</div>;
  }

  const formatBookList = (bookList) => {
    return bookList.map(({ startDate, endDate, dateModified, ...book }) => {
      return {
        startDate: startDate ? formatISOString(startDate) : startDate,
        endDate: endDate ? formatISOString(endDate) : endDate,
        dateModified: dateModified ? formatISOString(dateModified) : dateModified,
        ...book,
      };
    });
  };

  return (
    <StyledBookshelf>
      <div className={'controls'}>
        <div className={'bookshelf_view'}>
          <button
            className={`bookshelf_view_type${isListView ? ' active' : ''}`}
            onClick={() => {
              setIsListView(true);
            }}
          >
            <BsListUl className={'control_icon'} />
          </button>
          <button
            className={`bookshelf_view_type${!isListView ? ' active' : ''}`}
            onClick={() => {
              setIsListView(false);
            }}
          >
            <BsFillGridFill className={'control_icon'} />
          </button>
        </div>
      </div>
      <div className={'bookshelf_content'}>
        {isListView ? (
          <BookshelfList books={books} />
        ) : (
          <BookshelfGrid books={formatBookList(books)} columns={BOOKSHELF_TABLE_COLUMNS} defaultSortKey={'dateModified'} />
        )}
      </div>
    </StyledBookshelf>
  );
};

export default Bookshelf;
