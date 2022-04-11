import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const MAX_LENGTH = 250;

const StyledReadMoreTableCell = styled.div`
  .read_more {
    border: none;
    display: inline-block;
    padding: 0;
    background-color: #fff;
    text-decoration: underline;
    font-family: 'montserrat';
    color: ${(props) => props.theme.accentFontColor};
    font-size: 12px;
    &:hover {
      color: ${(props) => props.theme.accentBackgroundColor};
    }
  }
  p {
    margin: 0;
  }
`;

const ReadMoreTableCell = ({ cellText }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <StyledReadMoreTableCell>
      <p>
        {isReadMore ? cellText.slice(0, 150) : cellText}
        {cellText.length > MAX_LENGTH && (
          <button className={'read_more'} onClick={toggleReadMore}>
            {isReadMore ? '...more' : ' ...less'}
          </button>
        )}
      </p>
    </StyledReadMoreTableCell>
  );
};
export default ReadMoreTableCell;
