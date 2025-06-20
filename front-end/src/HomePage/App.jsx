import { useState, useEffect, useContext } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import FilterButtons from './FilterButtons.jsx';
import BoardList from './BoardList.jsx';
import './App.css';
import CreateBoardButton from './CreateBoardButton.jsx';
import CreateBoardModal from './CreateBoardModal.jsx';
import {DarkModeContext} from '../DarkModeContext.jsx';
import {fetchAllBoards, deleteBoard} from '../utils.js';

function App() {
  const{darkMode}= useContext(DarkModeContext);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);

  const loadBoards = async () => { // Load boards from API
    const data = await fetchAllBoards();
    setBoards(data);
  };

  useEffect(() => { // Load boards on initial render
    loadBoards();
  }, []);

  const apiBoards = fetchAllBoards();

  const handleCreateBoardClick = () => {
    setIsModalVisible(true); // Show modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide modal
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
    <div className={darkMode ? `Container container-dark` : `Container container-light`}>
      <header className={darkMode ? `dark-header` : `light-header`}>
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
        onDeleteClick={handleDeleteClick}
      />

      <footer className={darkMode ? `dark-footer` : `light-footer`}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
