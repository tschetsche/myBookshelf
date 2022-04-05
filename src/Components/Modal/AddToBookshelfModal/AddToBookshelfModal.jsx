import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectBookshelfList, selectUserBookMetaById } from '../../../store/selectors/bookshelf';
import { Formik, Form } from 'formik';
import { addBookToBookshelf, removeBookFromLibrary, updateUserBook } from '../../../store/actions/bookshelf';
import { useSelector } from 'react-redux';
import FormikDropdown from '../../Formik/FormikDropdown';
import FormikTextarea from '../../Formik/FormikTextarea';
import FormikDatePicker from '../../Formik/FormikDatePicker';
import Rating from '../../Rating/Rating';
import CloseButton from '../../CloseButton/CloseButton';
import { selectUserId } from '../../../store/selectors/user';
import ColoredButton from '../../ColoredButton/ColoredButton';
import { isDateBeforeOtherDate, isFutureDate } from '../../../util/dateUtil';
import { deepEqual } from '../../../util/objectUtil';

const StyledAddToBookshelfModal = styled.div`
  border-radius: 10px;
  position: fixed;
  background: ${(props) => props.theme.toggleElementColor};
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-family: 'montserrat';

  .modal {
    margin: 16px 0px;
  }
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
    margin-top: 16px;
  }
  .dates,
  .rating {
    display: flex;
    flex-direction: row;
  }
  .remove_from_library {
    outline: 0;
    position: absolute;
    border: 0;
    background: 0;
    cursor: pointer;
    bottom: 0;
    right: 0;
    padding: 0;
    padding-bottom: 8px;
    padding-right: 15px;
    color: #999999;
    :hover {
      text-decoration: underline;
    }
  }
  .submit_btn {
    margin: 12px 0px;
  }
  .form_controls {
    margin-top: 18px;
  }
`;

const AddToBookshelfModal = ({ title, setIsOpen, bookId, author, cover, rating }) => {
  const bookshelfList = useSelector(selectBookshelfList);
  const userBookMeta = useSelector((store) => selectUserBookMetaById(store, bookId));
  const [initialValues, setInitialValues] = useState({
    bookshelf: userBookMeta?.bookshelfId || '',
    startDate: userBookMeta?.startDate ? new Date(userBookMeta.startDate) : '',
    endDate: userBookMeta?.endDate ? new Date(userBookMeta.endDate) : '',
    notes: userBookMeta?.notes || '',
    review: userBookMeta?.review || '',
  });
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const getBookShelfDropdownOptions = () => {
    return bookshelfList.map(({ name, id }) => ({
      value: id,
      label: name,
    }));
  };

  const handleDelete = () => {
    dispatch(removeBookFromLibrary(userBookMeta.id));
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
            initialValues={initialValues}
            onSubmit={(values) => {
              if (!deepEqual(initialValues, values)) {
                userBookMeta
                  ? dispatch(
                      updateUserBook(userBookMeta.id, {
                        startDate: values.startDate,
                        endDate: values.endDate,
                        notes: values.notes,
                        review: values.review,
                        bookshelfId: parseInt(values.bookshelf),
                        dateModified: new Date(),
                      })
                    )
                  : dispatch(
                      addBookToBookshelf(userId, {
                        startDate: values.startDate,
                        endDate: values.endDate,
                        notes: values.notes,
                        review: values.review,
                        title,
                        bookId,
                        bookshelfId: parseInt(values.bookshelf),
                        author,
                        cover,
                        dateModified: new Date(),
                      })
                    );
              }
              setIsOpen(false);
            }}
            validate={(values) => {
              const errorObj = {};
              let isValid = true;
              if (values.bookshelf === '') {
                isValid = false;
                errorObj.bookshelf = 'Bookshelf should be selected';
              }
              console.log(isFutureDate(values.startDate));
              if (values.startDate && isFutureDate(values.startDate)) {
                isValid = false;
                errorObj.startDate = 'Start date can not be in the future';
              }
              if (values.endDate && isFutureDate(values.endDate)) {
                isValid = false;
                errorObj.startDate = 'End date can not be in the future';
              }
              if (values.startDate && values.endDate && !isDateBeforeOtherDate(values.startDate, values.endDate)) {
                isValid = false;
                errorObj.startDate = 'Start date can not be after end date';
              }
              if (!isValid) return errorObj;
            }}
          >
            {({ values }) => (
              <Form>
                <div className='form_field'>
                  <FormikDropdown
                    name={'bookshelf'}
                    label={'Choose bookshelf:'}
                    placeholder={'Select bookshelf'}
                    options={getBookShelfDropdownOptions()}
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
                  {parseInt(values.bookshelf) !== 1 && !isNaN(parseInt(values.bookshelf)) && (
                    <FormikDatePicker name={'startDate'} label={'Date started'} />
                  )}
                  {parseInt(values.bookshelf) === 3 && <FormikDatePicker name={'endDate'} label={'Date finished'} />}
                </div>
                <div className={'form_controls'}>
                  <ColoredButton type={'submit'} className={'submit_btn'} title={'Submit'} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <CloseButton onClose={setIsOpen} />
        {userBookMeta && (
          <button className={'remove_from_library'} onClick={handleDelete}>
            Remove from my books
          </button>
        )}
      </div>
    </StyledAddToBookshelfModal>
  );
};

export default AddToBookshelfModal;
