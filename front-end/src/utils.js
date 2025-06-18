import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function fetchAllBoards(){
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}`,{method: 'GET'} )
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Boards:', data);
            setBoards(data); // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching boards:', error);
        });

    }, []); // Empty dependency array to run only on mount

    return boards;
}

export { fetchAllBoards };
