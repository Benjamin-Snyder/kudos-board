import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CardList from './CardList';
import './App.css';
import data from './data/data.js';
import CreateBoardButton from './CreateBoardButton.jsx';
import CreateBoardModal from './CreateBoardModal.jsx';

function App() {
  const [filter, setFilter] = useState('All');
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
        filter={filter}
        searchQuery={searchQuery}
        cards={data}
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
