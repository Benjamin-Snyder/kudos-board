import "./Header.css"
import Medal from "./assets/medal.png"

const Header = () => {
    const medalSrc = Medal;
    return(
        <div className="header">
            <img src= {medalSrc} alt="Main Logo" />
            <h1>KudoBoard</h1>
        </div>

    )

}


export default Header;
