import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectBookshelfList, selectUserBookMetaById } from '../../../store/selectors/bookshelf';
import { Formik, Form } from 'formik';
import { addBookToBookshelf, fetchUserLibrary, removeBookFromLibrary, updateUserBook } from '../../../store/actions/bookshelf';
import { useSelector } from 'react-redux';
import FormikDropdown from '../../Formik/FormikDropdown';
import FormikTextarea from '../../Formik/FormikTextarea';
import FormikDatePicker from '../../Formik/FormikDatePicker';
import Rating from '../../Rating/Rating';
import CloseButton from '../CloseButton/CloseButton';
import { selectUserId } from '../../../store/selectors/user';
import ColoredButton from '../../ColoredButton/ColoredButton';
import { formatISOString } from '../../../util/dataUtil';

const StyledAddToBookshelfModal = styled.div`
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
    margin-top: 6px;
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
`;

const AddToBookshelfModal = ({ title, setIsOpen, bookId, author, cover, rating }) => {
  const bookshelfList = useSelector(selectBookshelfList);
  const userBookMeta = useSelector((store) => selectUserBookMetaById(store, bookId));
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
            initialValues={{
              bookshelf: userBookMeta?.bookshelfId || '',
              rating: '',
              startDate: userBookMeta?.startDate ? formatISOString(userBookMeta.startDate) : '',
              endDate: userBookMeta?.endDate ? formatISOString(userBookMeta.endDate) : '',
              notes: userBookMeta?.notes || '',
              review: userBookMeta?.review || '',
            }}
            onSubmit={({ bookshelf, startDate, endDate, notes, review }) => {
              userBookMeta
                ? dispatch(
                    updateUserBook(userBookMeta.id, {
                      startDate,
                      endDate,
                      notes,
                      review,
                      bookshelfId: parseInt(bookshelf),
                      rating,
                      dateModified: new Date(),
                    })
                  )
                : dispatch(
                    addBookToBookshelf(userId, {
                      startDate,
                      endDate,
                      notes,
                      review,
                      title,
                      bookId,
                      bookshelfId: parseInt(bookshelf),
                      author,
                      cover,
                      rating,
                      dateModified: new Date(),
                    })
                  );
              setIsOpen(false);
            }}
            validate={(values) => {
              const errorObj = {};
              let isValid = true;
              if (values.bookshelf === '') {
                isValid = false;
                errorObj.bookshelf = 'Bookshelf should be selected';
              }
              if (!isValid) return errorObj;
            }}
          >
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
                <FormikDatePicker name={'startDate'} label={'Date started'} />
                <FormikDatePicker name={'endDate'} label={'Date finished'} />
              </div>
              <ColoredButton type={'submit'} className={'submit_btn'} title={'Submit'} />
            </Form>
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
