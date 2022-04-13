import React, {useState} from 'react';
import useDarkMode from '../features/service/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Switcher() {
    const {colorTheme, setTheme} = useDarkMode();
    const [darkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = (checked:any) => {
        setTheme(colorTheme)
        setDarkMode(checked)
    }

    return (
       <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
       />
    )
}
