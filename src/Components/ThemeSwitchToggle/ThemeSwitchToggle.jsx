import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsSunFill } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { ThemeContext } from 'HOC/GlobalThemeProvider';

const StyledThemeSwitchToggle = styled.div`
  .hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .toggle-wrapper {
    width: 65px;
    display: block;
  }

  .toggle {
    height: 32.5px;
    width: 65px;
    background: ${(props) => props.theme.toggleBackgroundColor};
    border-radius: 20px;
    padding: 6px;
    position: relative;
    margin: auto;
    cursor: pointer;
  }

  .toggle::before {
    content: '';
    display: block;
    height: 20.5px;
    width: 20.5px;
    border-radius: 15px;
    background: ${(props) => props.theme.toggleElementColor};
    position: absolute;
    z-index: 2;
    transform: translate(0);
    transition: transform 0.5s ease;
  }

  .toggle.enabled::before {
    transform: translateX(32.5px);
  }

  .toggle input {
    position: absolute;
    top: 0;
    opacity: 0;
  }

  .toggle .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 5px;
  }

  .toggle .icons svg {
    fill: ${(props) => props.theme.toggleElementColor};
    height: 15px;
    width: 15px;
    z-index: 0;
  }
`;

const ThemeSwitchToggle = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleTheme = useContext(ThemeContext);

  const toggleState = () => {
    setIsEnabled(!isEnabled);
    toggleTheme();
  };

  return (
    <StyledThemeSwitchToggle>
      <label className='toggle-wrapper' htmlFor={'theme-switch-toggle'}>
        <div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
          <span className='hidden'>{isEnabled ? 'Enable' : 'Disable'}</span>
          <div className='icons'>
            <BsSunFill />
            <BiMoon />
          </div>
          <input id={'theme-switch-toggle'} name={'theme-switch-toggle'} type='checkbox' checked={isEnabled} onChange={toggleState} />
        </div>
      </label>
    </StyledThemeSwitchToggle>
  );
};

export default ThemeSwitchToggle;
