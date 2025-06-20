import {createContext, useState} from 'react';

const DarkModeContext = createContext(); // create a context

function DarkModeProvider(props){
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return(
        <div>
            <DarkModeContext.Provider value={{darkMode,toggleDarkMode}}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    )
}

export {DarkModeContext, DarkModeProvider};
