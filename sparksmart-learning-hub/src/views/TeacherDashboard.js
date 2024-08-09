


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
  },
  classSchedule: {
    position: 'absolute',
    top: '275px',
    left: '329px',
    backgroundColor: '#F7D703',
    width: '352px',
    height: '674px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  classScheduleWhite: {
    position: 'absolute',
    top: '58px',
    left: '7px',
    backgroundColor: '#ffffff',
    width: '338px',
    height: '602px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  meeting1: {
    position: 'absolute',
    top: '16px',
    left: '15px',
    backgroundColor: '#D9D9D9',
    width: '318px',
    height: '109px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  meeting2: {
    position: 'absolute',
    top: '127px',
    left: '15px',
    backgroundColor: '#D9D9D9',
    width: '318px',
    height: '109px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  meeting3: {
    position: 'absolute',
    top: '241px',
    left: '15px',
    backgroundColor: '#D9D9D9',
    width: '318px',
    height: '109px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  meeting4: {
    position: 'absolute',
    top: '355px',
    left: '15px',
    backgroundColor: '#D9D9D9',
    width: '318px',
    height: '109px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  meetingDetails:{
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px',
    fontSize: '8px'
  },
  scheduleMeetingBtn: {
    backgroundColor: '#16A10A',
    borderRadius: '15px',
    width: '319px',
    height: '30px',
    position: 'absolute',
    top: '482px',
    left: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scheduleMeetingText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  rescheduleMeetingBtn: {
    backgroundColor: '#FFD900',
    borderRadius: '15px',
    width: '319px',
    height: '30px',
    position: 'absolute',
    top: '520px',
    left: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rescheduleMeetingText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  cancelMeetingBtn: {
    backgroundColor: '#E70F0F',
    borderRadius: '15px',
    width: '319px',
    height: '30px',
    position: 'absolute',
    top: '558px',
    left: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelMeetingText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
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

  <div style={styles.classSchedule}>
    <div style={styles.classScheduleWhite}>

        <div style={styles.meeting1}>
          <div style={styles.meetingDetails}>Meeting 1: 7/3/24</div>
          <div style={styles.meetingDetails}>Time Frame: 1:00 PM - 2:30 PM</div>
          <div style={styles.meetingDetails}>Instructor: Student A</div>
          <div style={styles.meetingDetails}>Reason: Tutoring</div>
        </div>

        <div style={styles.meeting2}>
          <div style={styles.meetingDetails}>Meeting 2: 7/3/24</div>
          <div style={styles.meetingDetails}>Time Frame: 1:00 PM - 2:30 PM</div>
          <div style={styles.meetingDetails}>Instructor: Student A</div>
          <div style={styles.meetingDetails}>Reason: Scheduling Formalities</div>
        </div>

        <div style={styles.meeting3}>
          <div style={styles.meetingDetails}>Meeting 3: 7/3/24</div>
          <div style={styles.meetingDetails}>Time Frame: 1:00 PM - 2:30 PM</div>
          <div style={styles.meetingDetails}>Instructor: Student A</div>
          <div style={styles.meetingDetails}>Reason: Homework Review</div>
        </div>

        <div style={styles.meeting4}>
          <div style={styles.meetingDetails}>Meeting 4: 7/3/24</div>
          <div style={styles.meetingDetails}>Time Frame: 1:00 PM - 2:30 PM</div>
          <div style={styles.meetingDetails}>Instructor: Student A</div>
          <div style={styles.meetingDetails}>Reason: Tutoring</div>
        </div>

      <div style={styles.scheduleMeetingBtn}>
        <div style={styles.scheduleMeetingText}>Schedule a new Meeting</div>
      </div>

      <div style={styles.rescheduleMeetingBtn}>
        <div style={styles.rescheduleMeetingText}>Reschedule a meeting</div>
      </div>

      <div style={styles.cancelMeetingBtn}>
        <div style={styles.cancelMeetingText}>Cancel a meeting</div>
      </div>

    </div>

  </div>

  
  </div>
);

export default TeacherDashboard;
