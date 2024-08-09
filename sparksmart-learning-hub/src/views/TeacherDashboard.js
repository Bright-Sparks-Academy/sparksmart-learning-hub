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
  },
  header: {
    textAlign: 'center',
    fontSize: '23px',
    fontFamily: "'Quicksand', sans-serif",
    position: 'absolute',
    top: '15px',
    left: '270px'
  },
  subheader: {
    fontSize: '13px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '50px',
    left: '30px'
  },
  teacherInfo: {
    position: 'absolute',
    top: '80px',
    left: '15px',
    backgroundColor: '#F7D703',
    width: '250px',
    height: '120px',
    borderRadius: '15px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  teacherInfoDetails: {
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px'
  },
  teacherViewBtn: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '50px',
    height: '20px',
    position: 'absolute',
    top: '95px',
    left: '190px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  teacherViewText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '12px'
  }
};

const TeacherDashboard = () => (
  <div style={styles.pageContainer}>
    <h1 style={styles.heading}>Teacher Dashboard</h1>
    <p>Welcome to the teacher dashboard.</p>
    <div style={styles.header}>Teacher Dashboard</div>
    <div style={styles.subheader}>Teacher Name's Profile</div>
    <div style={styles.teacherInfo}>
      <div style={styles.teacherInfoDetails}>Teacher Name</div>
      <div style={styles.teacherInfoDetails}>User ID</div>
      <div style={styles.teacherInfoDetails}>Class: Java</div>
      <div style={styles.teacherInfoDetails}>Last Joined: 5/24/24</div>
      <div style={styles.teacherInfoDetails}>Email: example@site.com</div>
      <div style={styles.teacherViewBtn}>
        <div style={styles.teacherViewText}>View</div>
      </div>
  </div>
  </div>
);

export default TeacherDashboard;
