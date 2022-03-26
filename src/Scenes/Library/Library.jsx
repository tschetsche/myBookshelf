import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Tabs from '../../Components/Tabs/Tabs';
import Bookshelf from '../../Components/Bookshelf/Bookshelf';
import { fetchUserLibrary } from '../../store/actions/bookshelf';
import { selectUserId } from '../../store/selectors/user';
import { selectBookshelfList } from '../../store/selectors/bookshelf';

const StyledLibrary = styled.div`
  margin-left: 20px;
`;

const Library = (props) => {
  const bookshelfList = useSelector(selectBookshelfList);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLibrary(userId));
  }, []);

  return (
    <StyledLibrary>
      <Tabs>
        {bookshelfList.map(({ name, id }) => (
          <div label={name} key={name}>
            <Bookshelf bookshelfId={id} />
          </div>
        ))}
      </Tabs>
    </StyledLibrary>
  );
};

export default Library;
