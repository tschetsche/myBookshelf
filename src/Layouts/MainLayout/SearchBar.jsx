import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const StyledSearchBar = styled.div`
  margin-right: -20px;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='text'] {
    position: relative;
    padding: 10px 40px 10px 20px;
    width: 20px;
    color: #525252;
    font-size: 14px;
    font-family: 'montserrat';
    border: none;
    border-radius: 5px;
    transition: width 0.4s ease;
    outline: none;

    &:focus {
      width: 300px;
    }
  }

  i {
    position: relative;
    left: -37px;
    color: inherit;
  }
  .search_icon {
    font-size: 24px;
  }
`;

const SearchBar = (props) => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?book=${encodeURIComponent(e.target.value)}`);
      e.target.blur();
      e.target.value = '';
    }
  };

  return (
    <StyledSearchBar>
      <div class='container'>
        <input placeholder='Search book...' class='js-search' type='text' onKeyDown={handleKeyDown}></input>
        <i>
          <AiOutlineSearch className={'search_icon'} />
        </i>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
