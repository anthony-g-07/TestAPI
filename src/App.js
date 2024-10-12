// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Navbar from './Navbar'; // Importing Navbar component
import GetList from './screens/getAllList';
import CreateListForm from './screens/CreateList'
import AddItemForm from './screens/AddItemForm';
import ItemList from './screens/Items';
import ItemManager from './screens/ItemManager';
import SelectListForItem from './screens/SelectListForItem';
import SearchItems from './screens/Search';
import RandomLists from './screens/RandomList';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar is outside the Routes so it stays on every page */}
        <Navbar />
        
        {/* This div creates some padding so content doesn't hide behind the fixed navbar */}
        <div style={{ paddingTop: '4rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/list" element={<GetList />} />
            <Route path="/createlist" element={<CreateListForm />} />
            <Route path="/additem" element={<AddItemForm />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/edit-item/:itemId" element={<ItemManager />} />
            <Route path="/select-list/:itemId" element={<SelectListForItem />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/random" element={<RandomLists />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;





































// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getAllListsForUser, getListById } from './itemService';

// function App() {
//   const [lists, setLists] = useState([]);
//   const [userId, setUserId] = useState("12345"); // Replace with actual user ID
//   const [selectedList, setSelectedList] = useState(null); // Store the details of a selected list

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const data = await getAllListsForUser(userId);
//         console.log(data);
//         console.log("hello\n\n\n")
//         setLists(data);
//       } catch (error) {
//         console.error("Failed to fetch lists", error);
//       }
//     };

//     fetchLists();
//   }, [userId]);

//   // Fetch details for a specific list when clicked
//   const handleListClick = async (listId) => {
//     try {
//       const listDetails = await getListById(listId); // Use the listId to get details
//       setSelectedList(listDetails); // Store the list details in state
//     } catch (error) {
//       console.error("Failed to fetch list by ID", error);
//     }
//   };

//   return (
//     <div>
//       <h2>User's Lists</h2>
//       <ul>
//         {lists.map((list) => (
//           <li key={list.id} onClick={() => handleListClick(list.id)}>
//             {list.name} (Click for details)
//           </li>
//         ))}
//       </ul>

//       {selectedList && (
//         <div>
//           <h3>Selected List Details</h3>
//           <p>ID: {selectedList.id}</p>
//           <p>Name: {selectedList.name}</p>
//           <p>Description: {selectedList.public}</p>
//           {/* Display other details as needed */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
