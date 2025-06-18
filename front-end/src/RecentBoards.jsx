import { useState, useEffect, use } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import FilterButtons from './FilterButtons.jsx';
import CardList from './CardList.jsx';
import './App.css';
import CreateBoardButton from './CreateBoardButton.jsx';
import CreateBoardModal from './CreateBoardModal.jsx';

import {fetchAllBoards} from './utils.js';

function App() {

  const apiBoards = fetchAllBoards();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery

  const handleViewClick = (board) => {
    console.log('View clicked:', board);
  };

  const handleDeleteClick = (board) => {
    console.log('Delete clicked:', board);
  };

  const handleFilterChange = (newFilter) =>{
    setFilter(newFilter);
  }

  const handleSearchChange = (query) =>{
    setSearchQuery(query);
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="top-ui">
        <div className="search-bar">
          <SearchBar onSearchChange={handleSearchChange} /> {/* Pass setSearchQuery */}
        </div>
        <div className="filter-buttons">
          <FilterButtons setFilter={handleFilterChange} />
        </div>
        <div className="create-board-button">
          <CreateBoardButton />
        </div>
      </div>



      <CardList
        filter={"recent"}
        searchQuery={searchQuery}
        cards={apiBoards}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
