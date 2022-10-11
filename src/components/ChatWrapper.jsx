import RoomsList from 'components/rooms/list/RoomsList';
import RoomItem from 'components/rooms/item/RoomItem';
import Close from './../assets/img/icons/cancel.svg';
import { createContext, useState } from 'react';
import Switch from 'react-switch';
import MoonSvg from '../assets/img/icons/moon.svg';
import SunSvg from '../assets/img/icons/sun.svg';

export const ThemeContext = createContext(null);

export default function ChatWrapper({ userExternalUuid, logo, title, toggleChangeMode, headerColor }) {
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);
  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark': 'light'));
    setChecked((checked) => !checked);
  };
  const moon = <img
    className={'moon'}
    src={MoonSvg}
    alt={'moon'}
  />;
  const sun = <img
    className={'sun'}
    src={SunSvg}
    alt={'sun'}
  />;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={'container'}
        id={theme}
      >
        <Switch
          onChange={toggleTheme}
          checked={checked}
          checkedIcon={sun}
          uncheckedIcon={moon}
        />
        {(logo || title) && <div
          className={'chat-header'}
          style={{ background: headerColor }}
        >
          <div>
            {logo &&
              <img
                src={logo}
                alt={'logo'}
              />}
            {title && <div>{title}</div>}
          </div>
          <button onClick={toggleChangeMode}>
            <img
              src={Close}
              alt={'Close'}
            />
          </button>
        </div>}
        <div id={'wrapper'}>
          <RoomsList isHeader={(logo || title)} />
          <RoomItem
            isHeader={(logo || title)}
            userExternalUuid={userExternalUuid}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
