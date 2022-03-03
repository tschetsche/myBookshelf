import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bookListSelector } from '../../store/selectors/bookshelf';
import styled from 'styled-components';

const StyledLibrary = styled.div`
  margin-left: 20px;
  .book_category {
    margin-top: 16px;
    margin-bottom: 24px;
  }
  .book_category_list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 15px 15px 15px 0;
    list-style: none;
  }
  .book_category_list_item {
    margin-right: 8px;
    white-space: nowrap;
    a {
      position: relative;
      padding: 12px 16px;
      border-radius: 8px;
      color: #3d3d4e;
      font-family: 'montserrat';
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-decoration: none;
    }
  }
  .active a {
    background: #f3f3f4;
    color: #000;
    font-weight: 500;
    cursor: default;
  }
`;

const Library = (props) => {
  const bookshelfList = useSelector(bookListSelector);
  const [selectedBookshelf, setSelectedBookshel] = useState(bookshelfList[0]);

  return (
    <StyledLibrary>
      <nav className={'book_category'}>
        <ul className={'book_category_list'}>
          {bookshelfList.map((el) => (
            <li key={el} className={`book_category_list_item${selectedBookshelf === el ? ' active' : ''}`}>
              <Link to={'/'}>{el}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledLibrary>
  );
};

export default Library;
