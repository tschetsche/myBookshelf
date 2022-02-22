import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import fakeApi from '../../api/fakeApi';
import AddToBookshelfModal from '../../Components/Modal/AddToBookshelfModal/AddToBookshelfModal';
import { ModalContext } from 'HOC/GlobalModalProvider';

const StyledBook = styled.div`
  width: 65vw;
  margin: 30px auto 30px auto;
  font-family: 'montserrat';

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .content-aside {
    margin-right: 40px;
    padding: 30px;
  }
  .cover img {
    zoom: 2;
  }
  .cover {
    margin-bottom: 20px;
  }

  .description {
    margin: 16px 0px 16px 0px;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${(props) => props.theme.accentFontColor};
  }

  .author {
    margin-bottom: 15px;
  }

  .author-link {
    font-weight: 600;
  }

  .detail-row label {
    width: 180px;
    display: inline-block;
  }

  .detail-row span {
    position: relative;
    top: 2px;
  }

  .bookshelf-add {
    background-color: ${(props) => props.theme.accentFontColor};
    cursor: pointer;
    border-radius: 2px;
    height: 38px;
    text-align: center;
    line-height: 38px;
  }
  .bookshelf-add span {
    color: #fff;
  }
`;

const Book = (props) => {
  const [book, setBook] = useState({});
  const params = useParams();

  const openModal = useContext(ModalContext);

  useEffect(() => {
    fakeApi.get(`/book/${params.bookID}`).then((response) => {
      setBook(response.data);
    });
  }, []);

  const toggleModal = () => {
    openModal(<AddToBookshelfModal setIsOpen={openModal} title={book.title} />);
  };

  return (
    <StyledBook>
      <div className='content'>
        <div className={'content-aside'}>
          <div className={'cover'}>
            <img src={book.cover} alt={book.title}></img>
          </div>
          <div className={'bookshelf-add'} onClick={toggleModal}>
            <span>Add to Bookshelf</span>
          </div>
          <div className={'readers'}></div>
          <div className={'reviews'}></div>
        </div>
        <div className={'content-main'}>
          <h1 className={'title'}>{book.title}</h1>
          <div className={'author'}>
            <span>by</span>
            &nbsp;
            <Link className={'author-link'} to={'/'}>
              {book.author}
            </Link>
          </div>
          <div className={'details'}>
            <div className={'publishDate detail-row'}>
              <label>Publish date:</label>
              <span>{book.publishDate}</span>
            </div>
            <div className={'categories detail-row'}>
              <label>Categories:</label>
              <span>
                {book.categories?.map((category, index, array) =>
                  index !== array.lenght ? (
                    <React.Fragment>
                      <Link to={'/'}>{category}</Link> &nbsp;
                    </React.Fragment>
                  ) : (
                    <Link to={'/'}>{category}</Link>
                  )
                )}
              </span>
            </div>
            <div className={'pages detail-row'}>
              <label>Pages:</label>
              <span>{book.pageCount}</span>
            </div>
            <div className={'rating detail-row'}>
              <label>Rating:</label>
              <span>{book.rating}</span>
            </div>
            <div className={'description'}>
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: book.description }} />
            </div>
          </div>
        </div>
      </div>
    </StyledBook>
  );
};

export default Book;
