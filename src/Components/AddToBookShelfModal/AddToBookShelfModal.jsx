import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Dropdown from '../Dropdown/Dropdown';
import { addBookToShelf } from '../../store/actions/bookShelf';
import { useSelector } from 'react-redux';

const StyledAddToBookShelfModal = styled.div`
  position: fixed;
  background: grey;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .modal-header {
    width: 30px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(500px - 60px);
  }
  .modal-controls {
    display: flex;
    flex-direction: row;
    width: 30px;
  }
`;

const AddToBookShelfModal = (props) => {
  const bookshelfList = useSelector((store) => store.bookshelfReducer.bookshelfList);
  const [selectedBookshelf, setSelectedBookshelf] = useState(bookshelfList[0]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedBookshelf(event.target.value);
  };

  const getBookShelfDropdownOptions = () => {
    return bookshelfList.map((bookshelf) => ({
      value: bookshelf,
      label: bookshelf,
    }));
  };

  const addToBookshelf = (bookshelf) => {
    dispatch(addBookToShelf({ bookshelf, book: props.title }));
    props.setIsOpen(false);
  };

  return (
    <StyledAddToBookShelfModal>
      <div className={'modal'}>
        <div className={'header'}>
          <div className={'title'}>{props.title}</div>
        </div>
        <div className={'content'}>
          <div className={'heading'}> Add to Bookshelf</div>
          <div className={'shelf-select'}>
            <Dropdown id={'bookShelf-select'} label={'Select bookshelf'} options={getBookShelfDropdownOptions()} onChange={handleChange} />
          </div>
          <div className={'rating'}>
            <div className={'heading'}></div>
            <div className={'rating-bar'}></div>
          </div>
        </div>
        <div className={'footer'}>
          <div className={'modal-controls'}>
            <button
              className={'cancel'}
              onClick={() => {
                props.setIsOpen(false);
              }}
            >
              close
            </button>
            <button
              className={'save'}
              onClick={() => {
                addToBookshelf(selectedBookshelf);
              }}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </StyledAddToBookShelfModal>
  );
};

export default AddToBookShelfModal;
