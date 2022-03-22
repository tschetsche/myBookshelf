import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLibrary } from '../../store/actions/bookshelf';
import { selectBookshelfById } from '../../store/selectors/bookshelf';
import { selectUserId } from '../../store/selectors/user';
import { BsFillGridFill, BsListUl } from 'react-icons/bs';
import BookshelfList from './BookshelfList';
import BookshelfGrid from './BookshelfGrid';
import styled from 'styled-components';

const BOOKSHELF_TABLE_COLUMNS = [
  { name: 'cover', dataKey: 'cover' },
  { name: 'title', dataKey: 'title' },
  { name: 'author', dataKey: 'author' },
  {
    name: 'rating',
    dataKey: 'rating',
  },
  {
    name: 'review',
    dataKey: 'review',
  },
  {
    name: 'notes',
    dataKey: 'notes',
  },
  {
    name: 'date started',
    dataKey: 'startDate',
  },
  {
    name: '',
    dataKey: 'actions',
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
  const userId = useSelector(selectUserId);

  const books = useSelector((store) => selectBookshelfById(store, bookshelfId));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLibrary(userId));
  }, []);

  if (!books) {
    return <div>No books found for this bookshelf</div>;
  }

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
        {isListView ? <BookshelfList books={books} /> : <BookshelfGrid books={books} columns={BOOKSHELF_TABLE_COLUMNS} />}
      </div>
    </StyledBookshelf>
  );
};

export default Bookshelf;
