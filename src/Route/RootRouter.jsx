import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookList from 'Scenes/BookList/BookList';
import Book from 'Scenes/Book/Book';
import Home from 'Scenes/Home/Home';
import Profile from 'Scenes/Profile/Profile';
import Library from '../Scenes/Library/Library';

const RootRouter = () => {
  return (
    <Routes>
      <Route path={'/books'} element={<BookList />} />
      <Route path={'/book/:bookID'} element={<Book />} />
      <Route path={'/'} element={<Home />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/lib'} element={<Library />} />
    </Routes>
  );
};

export default RootRouter;
