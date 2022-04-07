import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useField } from 'formik';

const StyledRating = styled.div`
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .on {
    color: #f7d723;
  }
  .off {
    color: #ccc;
  }
`;

const Rating = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [hover, setHover] = useState(0);

  const { setValue } = helpers;
  const { value } = meta;

  return (
    <StyledRating>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || value) ? 'on' : 'off'}
            onClick={() => {
              setValue(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(value)}
          >
            <FaStar className='star' />
          </button>
        );
      })}
    </StyledRating>
  );
};

export default Rating;
