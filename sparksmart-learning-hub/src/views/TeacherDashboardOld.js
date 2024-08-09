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
  accountInfo: {
    position: 'absolute',
    top: '275px',
    left: '6px',
    backgroundColor: '#F7D703',
    width: '315px',
    height: '254px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  accountInfoDetails: {
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px',
    fontSize: '10px'
  },
  editInfoBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: '15px',
    width: '123px',
    height: '32px',
    position: 'absolute',
    top: '197px',
    left: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editInfoText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '12px'
  },
  deleteAccountBtn: {
    backgroundColor: '#ff0000',
    borderRadius: '15px',
    width: '159px',
    height: '32px',
    position: 'absolute',
    top: '197px',
    left: '142px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteAccountText: {
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
    <div style={styles.accountInfo}>
      <div style={styles.accountInfoDetails}>Teacher Name</div>
      <div style={styles.accountInfoDetails}>Class: Java</div>
      <div style={styles.accountInfoDetails}>Last Joined: 5/24/24</div>
      <div style={styles.accountInfoDetails}>Email: example@site.com</div>

      <div style={styles.editInfoBtn}>
        <div style={styles.editInfoText}>Edit Info</div>
      </div>

      <div style={styles.deleteAccountBtn}>
        <div style={styles.deleteAccountText}>Delete Account</div>
      </div>
  </div>

  
  </div>
);

export default TeacherDashboard;
