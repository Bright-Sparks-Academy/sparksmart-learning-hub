

import ReactDOM from 'react-dom';
import React from 'react';


const styles = {
  pageContainer: {
    marginTop: '70px',
    padding: '1rem',
    fontFamily: "'Gotham', 'Quicksand', sans-serif",
    backgroundColor: '#FFFFEF',
    color: '#000000',
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
  accountInfoText: {
    position: 'absolute',
    top: '15px',
    left: '19px',
    width: '235px',
    height: '30px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
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
    paddingTop: '50',
    fontSize: '20px'
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
    fontSize: '20px'
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
    fontSize: '20px'
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
  classScheduleText: {
    position: 'absolute',
    top: '15px',
    left: '12px',
    width: '170px',
    height: '30px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
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
    fontSize: '20px',
    top: '6px',
    left: '15px',
    width: '276px',
    height: '100px'
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
  },
  messages: {
    position: 'absolute',
    top: '536px',
    left: '6px',
    backgroundColor: '#FFD900',
    width: '315px',
    height: '328px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  messagesText: {
    position: 'absolute',
    top: '11px',
    left: '12px',
    width: '112px',
    height: '30px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
  },
  messages1: {
    position: 'absolute',
    top: '50px',
    left: '22px',
    backgroundColor: '#D9D9D9',
    width: '282px',
    height: '123px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  messages2: {
    position: 'absolute',
    top: '182px',
    left: '22px',
    backgroundColor: '#D9D9D9',
    width: '282px',
    height: '123px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  numMessages: {
    position: 'absolute',
    top: '9px',
    left: '25.24px',
    width: '32px',
    height: '50px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '40px'
  },
  newMessages: {
    position: 'absolute',
    top: '61px',
    left: '-0.18px',
    width: '76px',
    height: '40px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
  },
  messagesdetails: {
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px',
    fontSize: '18px'
  },
  viewMessagesBtn: {
    backgroundColor: '#000000',
    borderRadius: '15px',
    width: '157.95px',
    height: '31px',
    position: 'absolute',
    top: '85px',
    left: '82.94px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewMessagesText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  reportProblem: {
    backgroundColor: '#FF0000',
    borderRadius: '25px',
    width: '315px',
    height: '35px',
    position: 'absolute',
    top: '874px',
    left: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reportProblemText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  options: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '315px',
    height: '35px',
    position: 'absolute',
    top: '914px',
    left: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  courseOptions: {
    position: 'absolute',
    top: '275px',
    left: '689px',
    backgroundColor: '#F7D703',
    width: '409px',
    height: '674px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  courseOptionsText: {
    position: 'absolute',
    top: '18px',
    left: '23px',
    width: '175px',
    height: '30px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
  },
  courseOptionsClass: {
    position: 'absolute',
    top: '64px',
    left: '34px',
    width: '120px',
    height: '25px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '20px'
  },
  leaveRequest: {
    backgroundColor: '#FF0000',
    borderRadius: '25px',
    width: '209px',
    height: '27px',
    position: 'absolute',
    top: '105px',
    left: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leaveRequestText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  changeRequest: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '209px',
    height: '27px',
    position: 'absolute',
    top: '143px',
    left: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeRequestText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  courseOptionsStudent: {
    position: 'absolute',
    top: '225px',
    left: '34px',
    width: '159px',
    height: '25px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '20px'
  },
  gradebookBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '261px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradebookText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  studentPostHistoryBtn: {
    backgroundColor: '#000000',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '298px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentPostHistoryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  reportedStudentsBtn: {
    backgroundColor: '#FF0000',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '335px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reportedStudentsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  adminBtn: {
    backgroundColor: '#FFFFB0',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '437px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  adminText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  courseMaterialsBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '477px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  courseMaterialsText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  rulesBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '517px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rulesText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  postHistoryBtn: {
    backgroundColor: '#000000',
    borderRadius: '25px',
    width: '347px',
    height: '30px',
    position: 'absolute',
    top: '557px',
    left: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  postHistoryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  preferences: {
    position: 'absolute',
    top: '275px',
    left: '1106px',
    backgroundColor: '#F7D703',
    width: '400px',
    height: '674px',
    borderRadius: '25px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  },
  preferencesText: {
    position: 'absolute',
    top: '17px',
    left: '13px',
    width: '137px',
    height: '30px',
    borderRadius: '25px',
    paddingTop: '5px',
    color: 'black',
    fontSize: '16px'
  },
  languageBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    width: '187px',
    height: '32px',
    position: 'absolute',
    top: '57px',
    left: '203px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '20px'
  },
  restoreDefaultsBtn: {
    backgroundColor: '#FF0000',
    borderRadius: '25px',
    width: '255px',
    height: '38px',
    position: 'absolute',
    top: '535px',
    left: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  preferencesItem: {
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px',
    fontSize: '20px',
    top: '60px',
    left: '20px'
  }
};

const TeacherDashboard = () => (
  <div style={styles.pageContainer}>

    <div style={styles.header}>Teacher Dashboard</div>
    <div style={styles.subheader}>Teacher Name's Profile</div>


    <div style={styles.accountInfo}>
      <div style = {styles.accountInfoText}>Account Information</div>
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
    <div style={styles.classScheduleText}>Class Schedule</div>
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

  <div style={styles.messages}>

    <div style={styles.messagesText}>Messages</div>
    <div style={styles.messages1}>
      <div style={styles.numMessages}>11</div>
      <div style={styles.newMessages}>New Messages</div>
      <div style={styles.messagesdetails}>Class: Java</div>
      <div style={styles.messagesdetails}>Student: Student A</div>

      <div style={styles.viewMessagesBtn}>
        <div style={styles.viewMessagesText}>View Messages</div>
      </div>
    </div>

    <div style={styles.messages2}>
      <div style={styles.numMessages}>8</div>
      <div style={styles.newMessages}>New Messages</div>
      <div style={styles.messagesdetails}>Class: Java</div>
      <div style={styles.messagesdetails}>Student: Student B</div>

      <div style={styles.viewMessagesBtn}>
        <div style={styles.viewMessagesText}>View Messages</div>
      </div>
    </div>
  </div>

  <div style={styles.reportProblem}>
    <div style={styles.reportProblemText}>Report a problem</div>
  </div>

  <div style={styles.options}>
    <div style={styles.optionsText}>Options</div>
  </div>

  <div style={styles.courseOptions}>

    <div style={styles.courseOptionsText}>Course Options</div>

    <div style={styles.courseOptionsClass}>Class: Java 1</div>

    <div style={styles.leaveRequest}>
      <div style={styles.leaveRequestText}>Request to Leave</div>
    </div>

    <div style={styles.changeRequest}>
      <div style={styles.changeRequestText}>Request a Change</div>
    </div>

    <div style={styles.courseOptionsStudent}>Student Options:</div>

    <div style={styles.gradebookBtn}>
      <div style={styles.gradebookText}>View Student Gradebook</div>
    </div>

    <div style={styles.studentPostHistoryBtn}>
      <div style={styles.studentPostHistoryText}>View Student Post History</div>
    </div>

    <div style={styles.reportedStudentsBtn}>
        <div style={styles.reportedStudentsText}>View Status on Reported Students</div>
      </div>

    <div style={styles.adminBtn}>
      <div style={styles.adminText}>Contact Administrator</div>
    </div>

    <div style={styles.courseMaterialsBtn}>
      <div style={styles.courseMaterialsText}>View Course Materials</div>
    </div>

    <div style={styles.rulesBtn}>
      <div style={styles.rulesText}>View Rules and Agreements</div>
    </div>

    <div style={styles.postHistoryBtn}>
        <div style={styles.postHistoryText}>View Post History</div>
    </div>

  </div>

  <div style = {styles.preferences}>

    <div style = {styles.preferencesText}>Preferences</div>

    <div style={styles.preferencesItem}>Language: English</div>
    <div style={styles.preferencesItem}>Allow Notifications</div>
    <div style={styles.preferencesItem}>Dark Mode</div>
    <div style={styles.preferencesItem}>Allow 2FA</div>
    <div style={styles.preferencesItem}>Allow Contact via SMS</div>
    <div style={styles.preferencesItem}>Brightness:</div>
    <div style={styles.preferencesItem}>Text Size:</div>
    <div style={styles.preferencesItem}>Mic Volume:</div>
    <div style={styles.preferencesItem}>Speaker Volume:</div>

    <div style={styles.languageBtn}>
        <div style={styles.languageText}>View Post History</div>
    </div>

    <div style={styles.restoreDefaultsBtn}>
        <div style={styles.restoreDefaultsText}>View Post History</div>
    </div>

  </div>

  
  </div>
);

export default TeacherDashboard;
