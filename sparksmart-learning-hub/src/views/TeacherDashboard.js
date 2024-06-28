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

const TeacherDashboard = () => (
  <div style={styles.pageContainer}>
    <h1 style={styles.heading}>Teacher Dashboard</h1>
    <p>Welcome to the teacher dashboard.</p>
  </div>
);

export default TeacherDashboard;
