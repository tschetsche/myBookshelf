import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BookList from 'Scenes/BookList/BookList';
import Book from 'Scenes/Book/Book';
import Home from 'Scenes/Home/Home';
import Profile from 'Scenes/Profile/Profile';
import Library from '../Scenes/Library/Library';
import LoginModal from '../Components/Modal/LoginModal/LoginModal';
import { ModalContext } from '../HOC/GlobalModalProvider';
import { useSelector } from 'react-redux';
import { userIsLoggedInSelector } from '../store/selectors/user';
import Search from '../Scenes/Search/Search';

const RootRouter = () => {
  const openModal = useContext(ModalContext);
  const isLoggedIn = useSelector(userIsLoggedInSelector);

  const renderForLoggedIn = (component) => {
    if (!isLoggedIn) {
      openModal(<LoginModal onClose={openModal} />);
      // useNavigate
    } else {
      return component;
    }
  };

  return (
    <Routes>
      <Route path={'/books'} element={<BookList />} />
      {/* <Route path={'/books'} element={() => renderForLoggedIn(<BookList />)} /> */}
      <Route path={'/book/:bookID'} element={<Book />} />
      <Route path={'/'} element={<Home />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/lib'} element={<Library />} />
      {/* <Route path={'/lib'} element={() => renderForLoggedIn(<Library />)} /> */}
      <Route path={'/search'} element={<Search />} />
    </Routes>
  );
};

export default RootRouter;
