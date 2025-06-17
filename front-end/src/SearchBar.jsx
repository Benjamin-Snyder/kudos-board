import {useState} from 'react';
import './SearchBar.css'

const SearchBar = ({onSearchChange}) => {
    const[inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearchClick = () => {
        onSearchChange(inputValue);
    }

    const handleEnterKey= (event) => {
        if (event.key === 'Enter') {
            onSearchChange(inputValue);
        }
    }

    const handleClearClick = () => {
        setInputValue('');
        onSearchChange('');
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search boards..." value={inputValue} onChange={handleInputChange} onKeyDown={handleEnterKey}/>
            <button className="button-text" onClick={handleSearchClick}>Search</button>
            <button className="button-text" onClick={handleClearClick}>Clear</button>
        </div>
    )
}

export default SearchBar;
