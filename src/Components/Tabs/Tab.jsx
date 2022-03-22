import React from 'react';
import styled from 'styled-components';

const StyledTab = styled.div`
  margin-right: 8px;
  .tab_list_item {
    white-space: nowrap;
    position: relative;
    padding: 12px 16px;
    border-radius: 8px;
    color: #3d3d4e;
    font-family: 'montserrat';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }
  .active {
    background: #f3f3f4;
    color: #000;
    font-weight: 500;
    cursor: default;
  }
`;
const Tab = ({ activeTab, label, onClick }) => {
  const handleClick = () => {
    onClick(label);
  };

  let className = 'tab_list_item';

  if (activeTab === label) {
    className += ' active';
  }

  return (
    <StyledTab>
      <li className={className} onClick={handleClick}>
        {label}
      </li>
    </StyledTab>
  );
};

export default Tab;
