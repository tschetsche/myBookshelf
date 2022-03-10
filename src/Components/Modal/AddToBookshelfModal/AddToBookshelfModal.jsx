import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { bookshelfSelector, selectItemsByCategory } from '../../../store/selectors/bookshelf';
import { Formik, Form } from 'formik';
import { addBookToShelf } from '../../../store/actions/bookshelf';
import { useSelector } from 'react-redux';
import FormikDropdown from '../../Formik/FormikDropdown';
import FormikTextarea from '../../Formik/FormikTextarea';
import FormikDatePicker from '../../Formik/FormikDatePicker';
import Rating from '../../Rating/Rating';
import CloseButton from '../CloseButton/CloseButton';

const StyledAddToBookshelfModal = styled.div`
  position: fixed;
  background: ${(props) => props.theme.toggleElementColor};
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-family: 'montserrat';

  .modal_header {
    margin: 15px;
  }

  .modal_content {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(500px - 60px);
    label {
      margin-right: 3px;
      font-size: 14px;
    }
  }

  .modal_controls {
    display: flex;
    flex-direction: row;
    width: 30px;
  }
  .form_field {
    margin-top: 6px;
  }
  .dates,
  .rating {
    display: flex;
    flex-direction: row;
  }
`;

const AddToBookshelfModal = ({ title, setIsOpen, bookId }) => {
  const bookshelfList = useSelector(bookshelfSelector);
  const [selectedBookshelf, setSelectedBookshelf] = useState(bookshelfList[0].id);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedBookshelf(event.target.value);
  };

  const getBookShelfDropdownOptions = () => {
    return bookshelfList.map(({ name, id }) => ({
      value: id,
      label: name,
    }));
  };

  const addToBookshelf = (bookshelfId) => {
    dispatch(addBookToShelf({ bookshelfId: parseInt(bookshelfId), bookId }));
    setIsOpen(false);
  };

  return (
    <StyledAddToBookshelfModal>
      <div className={'modal'}>
        <div className={'modal_header'}>
          <div className={'modal_title'}>{title}</div>
        </div>
        <div className={'modal_content'}>
          <Formik
            initialValues={{ bookshelf: '', rating: '', startDate: new Date(), endDate: '' }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <div className='form_field'>
                <FormikDropdown
                  name={'bookshelf'}
                  label={'Choose bookshelf:'}
                  placeholder={'Select bookshelf'}
                  options={getBookShelfDropdownOptions()}
                  onChange={handleChange}
                />
              </div>
              <div className='form_field rating'>
                <label htmlFor='rating'>My rating:</label>
                <Rating name={'rating'} />
              </div>
              <div className='form_field'>
                <FormikTextarea name={'notes'} placeholder={'What did you think'} rows={4} />
              </div>
              <div className='form_field'>
                <FormikTextarea name={'review'} placeholder={'Enter your review'} rows={12} />
              </div>
              <div className='form_field dates'>
                <FormikDatePicker name={'startDate'} label={'Date started'} />
                <FormikDatePicker name={'endDate'} label={'Date finished'} />
              </div>
              <button>submit</button>
            </Form>
          </Formik>
        </div>
        <CloseButton onClose={setIsOpen} />
      </div>
    </StyledAddToBookshelfModal>
  );
};

export default AddToBookshelfModal;
