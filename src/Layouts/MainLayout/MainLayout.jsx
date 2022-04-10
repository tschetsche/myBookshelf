import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import RootRouter from '../../Route/RootRouter';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../Components/Toast/Toast';
import fakeApi from '../../api/fakeApi';
import { initBookshelfList } from '../../store/actions/bookshelf';
import { useDispatch } from 'react-redux';
import { selectApiError } from '../../store/selectors/globalApp';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const StyledMainLayout = styled.div`
  background-color: ${(props) => props.theme.baseBackgroundColor};

  .footer {
    background-color: ${(props) => props.theme.navbarBackgroundColor};
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-family: 'montserrat';
    color: ${(props) => props.theme.baseFontColor};
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .footerText {
    padding-top: 10px;
    padding-left: 20px;
    font-weight: 900;
    font-size: 17.5px;
  }

  .themeSwitch {
    margin-right: 20px;
  }

  .content {
    width: 100%;
    min-height: calc(100vh - 100px);
    position: relative;
  }

  .content::after {
    content: '';
    display: block;
    height: 50px;
  }
`;

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const apiError = useSelector(selectApiError);

  useEffect(() => {
    fakeApi.get('/bookshelves').then((response) => {
      dispatch(initBookshelfList(response.data));
    });
  }, []);

  useEffect(() => {
    if (apiError?.message) {
      toast.error(apiError.message);
    }
  }, [apiError?.date]);

  return (
    <StyledMainLayout>
      <div className={'layout'}>
        <Header />
        <div className={'content'}>
          <RootRouter />
          <Toast />
        </div>
        <div className={'footer'}>
          <div className={'footerText'}>Footer</div>
        </div>
      </div>
    </StyledMainLayout>
  );
};

export default MainLayout;
