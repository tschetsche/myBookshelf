import React, { useEffect } from 'react';
import Card from 'Components/Card/Card';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { bookListSelector } from 'store/selectors/bookList';
import { useDispatch } from 'react-redux';
import { replaceBookList } from 'store/actions/bookList';

const StyledBookList = styled.div`
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
`;

const StyledLoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accentFontColor};
  font-size: 20px;
`;

const BookList = (props) => {
  const bookList = useSelector(bookListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        replaceBookList([
          {
            bookTitle: 'Name 1',
            bookCover:
              'https://books.google.pl/books/content?id=xnbfAQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73_IGt4fDsNtbuiYxSIKYkzNiem0ulXhu1rhAdMrEUEFkvFhPQr603FMkaq_EZ-89bFRX93_6PXghwWhhn4mQT-h2F2Wnifz78PA-BBFpgc1GkFnoHcTo1MKBGO-HJxLTmCFpe7',
            id: 1,
          },
          {
            bookTitle: 'Name 2',
            bookCover:
              'https://books.google.pl/books/content?id=xnbfAQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73_IGt4fDsNtbuiYxSIKYkzNiem0ulXhu1rhAdMrEUEFkvFhPQr603FMkaq_EZ-89bFRX93_6PXghwWhhn4mQT-h2F2Wnifz78PA-BBFpgc1GkFnoHcTo1MKBGO-HJxLTmCFpe7',
            id: 2,
          },
          {
            bookTitle: 'Name 3',
            bookCover:
              'https://books.google.pl/books/content?id=xnbfAQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73_IGt4fDsNtbuiYxSIKYkzNiem0ulXhu1rhAdMrEUEFkvFhPQr603FMkaq_EZ-89bFRX93_6PXghwWhhn4mQT-h2F2Wnifz78PA-BBFpgc1GkFnoHcTo1MKBGO-HJxLTmCFpe7',
            id: 3,
          },
          {
            bookTitle: 'Name 4',
            bookCover:
              'https://books.google.pl/books/content?id=xnbfAQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73_IGt4fDsNtbuiYxSIKYkzNiem0ulXhu1rhAdMrEUEFkvFhPQr603FMkaq_EZ-89bFRX93_6PXghwWhhn4mQT-h2F2Wnifz78PA-BBFpgc1GkFnoHcTo1MKBGO-HJxLTmCFpe7',
            id: 4,
          },
          {
            bookTitle: 'Name 5',
            bookCover:
              'https://books.google.pl/books/content?id=xnbfAQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73_IGt4fDsNtbuiYxSIKYkzNiem0ulXhu1rhAdMrEUEFkvFhPQr603FMkaq_EZ-89bFRX93_6PXghwWhhn4mQT-h2F2Wnifz78PA-BBFpgc1GkFnoHcTo1MKBGO-HJxLTmCFpe7',
            id: 5,
          },
        ])
      );
    }, 1000);
  }, []);

  if (!bookList) {
    return <StyledLoadingWrapper>...Loading</StyledLoadingWrapper>;
  }

  return (
    <StyledBookList>
      {bookList.map((bookInfo) => (
        <Card key={bookInfo.id} cardID={bookInfo.id} bookTitle={bookInfo.bookTitle} bookCover={bookInfo.bookCover} />
      ))}
    </StyledBookList>
  );
};

export default BookList;
