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

const StudentDashboard = () => (
  <div style={styles.pageContainer}>
    <h1 style={styles.heading}>Student Dashboard</h1>
    <p>Welcome to the student dashboard.</p>
  </div>
);

export default StudentDashboard;