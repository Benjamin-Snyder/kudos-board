import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search Movie" />
            <button className="button-text">Search</button>
            <button className="button-text">Clear</button>
        </div>
    )
}

export default SearchBar;
