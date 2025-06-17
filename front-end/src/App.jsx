import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import BoardCard from './BoardCard';
import CardList from './CardList';
import './App.css';
import data from './data/data.js';

function App() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery

  const handleViewClick = (board) => {
    console.log('View clicked:', board);
  };

  const handleDeleteClick = (board) => {
    console.log('Delete clicked:', board);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="top-ui">
        <div className="search-bar">
          <SearchBar setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery */}
        </div>
        <div className="filter-buttons">
          <FilterButtons setFilter={setFilter} /> {/* Pass setFilter */}
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
