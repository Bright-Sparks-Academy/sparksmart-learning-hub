import React from 'react';

const styles = {
  pageContainer: {
    marginTop: '70px',
    padding: '1rem',
    fontFamily: "'Gotham', 'Quicksand', sans-serif",
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
  }
};

const AdminDashboard = () => (
  <div style={styles.pageContainer}>
    <h1 style={styles.heading}>Admin Dashboard</h1>
    <p>Welcome to the admin dashboard.</p>
  </div>
);

export default AdminDashboard;
