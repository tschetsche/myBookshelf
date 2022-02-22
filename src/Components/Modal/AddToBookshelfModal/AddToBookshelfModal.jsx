import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Dropdown from '../../Dropdown/Dropdown';
import { bookListSelector } from '../../../store/selectors/bookshelf';
import { addBookToShelf } from '../../../store/actions/bookshelf';
import { useSelector } from 'react-redux';

const StyledAddToBookshelfModal = styled.div`
  position: fixed;
  background: grey;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  .modal_header {
    width: 30px;
  }
  .modal_content {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(500px - 60px);
  }
  .modal_controls {
    display: flex;
    flex-direction: row;
    width: 30px;
  }
`;

const AddToBookshelfModal = ({ title, setIsOpen }) => {
  const bookshelfList = useSelector(bookListSelector);
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
    dispatch(addBookToShelf({ bookshelf, book: title }));
    setIsOpen(false);
  };

  return (
    <StyledAddToBookshelfModal>
      <div className={'modal'}>
        <div className={'modal_header'}>
          <div className={'modal_title'}>{title}</div>
        </div>
        <div className={'modal_content'}>
          <div className={'heading'}> Add to Bookshelf</div>
          <div className={'shelf_select'}>
            <Dropdown id={'bookShelf_select'} label={'Select bookshelf'} options={getBookShelfDropdownOptions()} onChange={handleChange} />
          </div>
          <div className={'rating'}>
            <div className={'heading'}></div>
            <div className={'rating_bar'}></div>
          </div>
        </div>
        <div className={'modal_footer'}>
          <div className={'modal_controls'}>
            <button
              className={'cancel'}
              onClick={() => {
                setIsOpen(false);
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
    </StyledAddToBookshelfModal>
  );
};

export default AddToBookshelfModal;
