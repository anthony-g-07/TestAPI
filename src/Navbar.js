// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/">Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about">About</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/list">List</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/createlist">Create List</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/additem">Add Item</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/items">Items</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/search">Search</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/random">Random</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'white',
    padding: '1rem',
    position: 'fixed', // Fixes the navbar at the top
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: '#fff',
  }
};

export default Navbar;
