import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from './Tab';

const StyledTabs = styled.div`
  .tabs {
    margin-top: 16px;
    margin-bottom: 24px;
  }
  .tab_list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 15px 15px 15px 0;
    list-style: none;
  }

  .tab_content {
    margin: 0px 120px;
  }
`;
const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledTabs>
      <div className='tabs'>
        <ol className='tab_list'>
          {props.children.map((child) => {
            const { label } = child.props;
            return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
          })}
        </ol>
        <div className='tab_content'>
          {props.children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    </StyledTabs>
  );
};

export default Tabs;
