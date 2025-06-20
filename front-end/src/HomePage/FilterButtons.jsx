import "./FilterButtons.css"

const FilterButtons= ({setFilter}) =>{

    return(
        <div className= "all-buttons">
            <button id="all-button" onClick={() => setFilter('all')}>All</button>
            <button id="recent-button" onClick={() => setFilter('recent')}>Recent</button>
            <button id = "celebration-button" onClick={() => setFilter('celebration')}>Celebration</button>
            <button id="thankyou-button" onClick={() => setFilter('thank You')}>Thank You</button>
            <button id="inspiration-button" onClick={() => setFilter('inspiration')}>Inspiration</button>
        </div>
    )
}

export default FilterButtons
