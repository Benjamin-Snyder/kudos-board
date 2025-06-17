import "./FilterButtons.css"

const FilterButtons= ({setFilter}) =>{

    return(
        <div className= "all-buttons">
            <button id="all-button" onClick={() => setFilter('All')}>All</button>
            <button id="recent-button" onClick={() => setFilter('Recent')}>Recent</button>
            <button id = "celebration-button" onClick={() => setFilter('Celebration')}>Celebration</button>
            <button id="thankyou-button" onClick={() => setFilter('Thank You')}>Thank You</button>
            <button id="inspiration-button" onClick={() => setFilter('Inspiration')}>Inspiration</button>
        </div>
    )
}

export default FilterButtons
