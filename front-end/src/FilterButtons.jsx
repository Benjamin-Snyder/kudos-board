import "./FilterButtons.css"
import {Link} from "react-router"
import { useParams, useLocation } from "react-router";


const FilterButtons= ({setFilter}) =>{

    return(
        <div className= "all-buttons">

            <Link to="/"><button id="all-button" onClick={() => setFilter('all')}>All</button></Link>
            <button id="recent-button" onClick={() => setFilter('recent')}>Recent</button>
            <button id = "celebration-button" onClick={() => setFilter('celebration')}>Celebration</button>
            <button id="thankyou-button" onClick={() => setFilter('thank You')}>Thank You</button>
            <button id="inspiration-button" onClick={() => setFilter('inspiration')}>Inspiration</button>
        </div>
    )
}

export default FilterButtons
