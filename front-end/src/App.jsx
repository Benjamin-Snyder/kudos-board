import { useState, useEffect, use } from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import BoardList from './BoardList.jsx';
import './App.css';
import CreateBoardButton from './CreateBoardButton.jsx';
import CreateBoardModal from './CreateBoardModal.jsx';

import {fetchAllBoards, deleteBoard} from './utils';

function App() {

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);


  const loadBoards = async () => {
    const data = await fetchAllBoards();
    setBoards(data);
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const apiBoards = fetchAllBoards();



  const handleCreateBoardClick = () => {
    setIsModalVisible(true); // Show modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide modal
  };


  const handleViewClick = (board) => {
    console.log('View clicked:', board);
  };

  const handleDeleteClick = async (boardId) => {
    try {
      await deleteBoard(boardId);
      loadBoards(); // Refresh the list of boards after deletion
    } catch (error) {
      console.error('Failed to delete board:', error);
    }
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
          <CreateBoardButton onClick={handleCreateBoardClick}/>
        </div>
      </div>

      <CreateBoardModal
        isModalVisible={isModalVisible}
        onClose={handleCloseModal}
        onBoardCreated={loadBoards}
      />

      <BoardList
        filter={filter}
        searchQuery={searchQuery}
        cards={boards}
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
