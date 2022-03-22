import React from 'react';
import { useSelector } from 'react-redux';
import { selectBookshelfList } from '../../store/selectors/bookshelf';
import styled from 'styled-components';
import Tabs from '../../Components/Tabs/Tabs';
import Bookshelf from '../../Components/Bookshelf/Bookshelf';

const StyledLibrary = styled.div`
  margin-left: 20px;
`;

const Library = (props) => {
  const bookshelfList = useSelector(selectBookshelfList);

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
