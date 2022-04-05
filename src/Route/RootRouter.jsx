import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookList from 'Scenes/BookList/BookList';
import Book from 'Scenes/Book/Book';
import Home from 'Scenes/Home/Home';
import Profile from 'Scenes/Profile/Profile';
import Library from '../Scenes/Library/Library';
import Search from '../Scenes/Search/Search';
import { useSelector } from 'react-redux';
import { userIsLoggedInSelector } from '../store/selectors/user';

const RootRouter = () => {
  const isLoggedIn = useSelector(userIsLoggedInSelector);

  const renderForLoggedIn = (component) => {
    if (!isLoggedIn) {
      return <Home />;
    } else {
      return component;
    }
  };

  return (
    <Routes>
      <Route path={'/books'} element={<BookList />} />
      <Route path={'/book/:bookID'} element={<Book />} />
      <Route path={'/'} element={<Home />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/lib'} element={renderForLoggedIn(<Library />)} />
      <Route path={'/search'} element={<Search />} />
    </Routes>
  );
};

export default RootRouter;
