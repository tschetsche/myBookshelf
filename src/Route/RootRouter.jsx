import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookList from 'Scenes/BookList/BookList';
import Book from 'Scenes/Book/Book';

const RootRouter = () => {
  return (
    <Routes>
      <Route path={'/books'} element={<BookList />} />
      <Route path={'/book/:bookID'} element={<Book />} />
    </Routes>
  );
};

export default RootRouter;
