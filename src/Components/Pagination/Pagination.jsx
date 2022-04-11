import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import styled from 'styled-components';
const StyledPagination = styled.div`
  .pagination-container {
    display: flex;
    list-style-type: none;

    .pagination-item {
      padding: 0 12px;
      height: 32px;
      text-align: center;
      margin: auto 4px;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      box-sizing: border-box;
      align-items: center;
      letter-spacing: 0.01071em;
      border-radius: 16px;
      line-height: 1.43;
      font-size: 13px;
      min-width: 32px;

      &.dots:hover {
        background-color: transparent;
        cursor: default;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        cursor: pointer;
      }

      &.selected {
        background-color: rgba(0, 0, 0, 0.08);
      }

      .arrow {
        &::before {
          position: relative;
          content: '';
          display: inline-block;
          width: 0.4em;
          height: 0.4em;
          border-right: 0.12em solid rgba(0, 0, 0, 0.87);
          border-top: 0.12em solid rgba(0, 0, 0, 0.87);
        }

        &.left {
          transform: rotate(-135deg) translate(-50%);
        }

        &.right {
          transform: rotate(45deg);
        }
      }

      &.disabled {
        pointer-events: none;

        .arrow::before {
          border-right: 0.12em solid rgba(0, 0, 0, 0.43);
          border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }

        &:hover {
          background-color: transparent;
          cursor: default;
        }
      }
    }
  }
`;

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <StyledPagination>
      <ul className={'pagination-container'}>
        <li className={`pagination-item ${currentPage === 1 ? ' disabled' : ''}`} onClick={onPrevious}>
          <div className='arrow left' />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className='pagination-item dots'>&#8230;</li>;
          }

          return (
            <li className={`pagination-item ${currentPage === pageNumber ? ' selected' : ''}`} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          );
        })}
        <li className={`pagination-item ${currentPage === lastPage ? ' disabled' : ''}`} onClick={onNext}>
          <div className='arrow right' />
        </li>
      </ul>
    </StyledPagination>
  );
};

export default Pagination;
