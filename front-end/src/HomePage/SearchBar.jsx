import {useState} from 'react';
import './SearchBar.css'

const SearchBar = ({onSearchChange}) => {
    const[inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearchClick = () => { // Handle the search button click
        onSearchChange(inputValue);
    }

    const handleEnterKey= (event) => { // Handle the enter key
        if (event.key === 'Enter') {
            onSearchChange(inputValue);
        }
    }

    const handleClearClick = () => { // Handle the clear button click
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
