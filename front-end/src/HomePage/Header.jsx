import "./Header.css"
import Medal from "../assets/medal.png"
import { DarkModeContext } from "../DarkModeContext";
import { useContext } from "react";

const Header = () => {
    const medalSrc = Medal;
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const handleClick = () =>{
        toggleDarkMode();
    }
    return(
        <div className="header">
            <img src= {medalSrc} alt="Main Logo" />
            <h1>KudoBoard</h1>
            <label className="toggle-switch">
                <input type="checkbox" checked={darkMode} onChange={handleClick} />
                <span className="slider"></span>
            </label>
            <span className="mode-label">Toggle Dark Mode</span>
        </div>
    )
}

export default Header;
