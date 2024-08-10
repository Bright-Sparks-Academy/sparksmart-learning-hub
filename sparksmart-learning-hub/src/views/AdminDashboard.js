import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

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
  adminInfo: {
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
  adminInfoDetails: {
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px'
  },
  adminViewBtn: {
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
  adminViewText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '12px'
  },
  managedInstructors: {
    position: 'absolute',
    top: '80px',
    left: '270px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '230px',
    height: '175px'
  },
  managedInstructorsText: {
    fontSize: '12px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '0px',
    left: '10px'
  },
  instructorA: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '34px',
    left: '12px',
    width: '210px',
    height: '65px'
  },
  instructorB: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '104px',
    left: '12px',
    width: '210px',
    height: '65px'
  },
  instructor1: {
    fontSize: '9px',
    position: 'absolute',
    top: '29px',
    left: '12px'
  },
  instructor2: {
    fontSize: '10px',
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px'
  },
  instructor3: {
    position: 'absolute',
    top: '-22px',
    left: '152px',
    fontSize: '10px'
  },
  instructor4: {
    position: 'absolute',
    top: '-35px',
    left: '167px',
    fontSize: '20px'
  },
  instructor5: {
    position: 'absolute',
    top: '15px',
    left: '163px',
    fontSize: '8px'
  },
  instructorViewBtn: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '50px',
    height: '15px',
    position: 'absolute',
    top: '47px',
    left: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructorViewText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px'
  },
  communication: {
    position: 'absolute',
    top: '80px',
    left: '505px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '215px',
    height: '105px'
  },
  communicationText: {
    fontSize: '12px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  adminA: {
    fontSize: '9px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '55px',
    left: '30px'
  },
  adminB: {
    fontSize: '9px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '55px',
    left: '90px'
  },
  communicationViewBtn: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '50px',
    height: '15px',
    position: 'absolute',
    top: '85px',
    left: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  communicationViewText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px'
  },
  courseMaterials: {
    position: 'absolute',
    top: '205px',
    left: '15px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '250px',
    height: '255px'
  },
  courseMaterialsText: {
    fontSize: '12px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  courseMaterialsWhite: {
    position: 'absolute',
    top: '35px',
    left: '5px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    width: '238px',
    height: '215px'
  },
  lessonRecordings: {
    position: 'absolute',
    top: '45px',
    left: '5px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '110px',
    height: '155px'
  },
  lessonRecordingsText: {
    fontSize: '9px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  publishedAssignments: {
    position: 'absolute',
    top: '45px',
    left: '123px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '110px',
    height: '155px'
  },
  publishedAssignmentsText: {
    fontSize: '8px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-7px',
    left: '10px'
  },
  selectClass: {
    position: 'absolute',
    top: '5px',
    left: '65px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    width: '115px',
    height: '20px',
    border: '1px solid black'
  },
  selectClassText: {
    position: 'absolute',
    top: '-10px',
    left: '15px',
    fontSize: '10px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
  },
  recording1: {
    position: 'absolute',
    top: '20px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '10px',
    width: '95px',
    height: '30px'
  },
  recording2: {
    position: 'absolute',
    top: '58px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '10px',
    width: '95px',
    height: '30px'
  },
  recording3: {
    position: 'absolute',
    top: '96px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '10px',
    width: '95px',
    height: '30px'
  },
  recordingNumber: {
    fontSize: '8.5px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  recordingDate: {
    fontSize: '8.5px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '3px',
    left: '10px'
  },
  homework1: {
    position: 'absolute',
    top: '25px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    width: '98px',
    height: '45px'
  },
  homework2: {
    position: 'absolute',
    top: '75px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    width: '98px',
    height: '45px'
  },
  homework3: {
    position: 'absolute',
    top: '95px',
    left: '10px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    width: '98px',
    height: '30px'
  },
  homeworkNumber: {
    fontSize: '8px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '5px'
  },
  homeworkDate: {
    fontSize: '8px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '67px'
  },
  homeworkView: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '45px',
    height: '13px',
    position: 'absolute',
    top: '25px',
    left: '27.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeworkViewText: {
    color: 'yellow',
    textAlign: 'center',
    fontSize: '10px'
  },
  managedStudents: {
    position: 'absolute',
    top: '260px',
    left: '270px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '230px',
    height: '200px'
  },
  managedStudentsText: {
    fontSize: '12px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  selectInstructorStudents: {
    position: 'absolute',
    top: '33px',
    left: '58px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    width: '115px',
    height: '20px',
    border: '1px solid black'
  },
  selectInstructorStudentsText: {
    position: 'absolute',
    top: '-13px',
    left: '6px',
    fontSize: '10px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
  },
  studentA: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '60px',
    left: '15px',
    width: '210px',
    height: '65px'
  },
  studentB: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '130px',
    left: '15px',
    width: '210px',
    height: '65px'
  },
  student1: {
    fontSize: '9px',
    position: 'absolute',
    top: '29px',
    left: '12px'
  },
  student2: {
    fontSize: '10px',
    margin: '0',
    padding: '2px 35px',
    paddingLeft: '70px'
  },
  student3: {
    position: 'absolute',
    top: '-22px',
    left: '152px',
    fontSize: '10px'
  },
  student4: {
    position: 'absolute',
    top: '-35px',
    left: '167px',
    fontSize: '20px'
  },
  student5: {
    position: 'absolute',
    top: '15px',
    left: '163px',
    fontSize: '8px'
  },
  studentViewBtn: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '50px',
    height: '15px',
    position: 'absolute',
    top: '47px',
    left: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentViewText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px'
  },
  chatroomMonitor: {
    position: 'absolute',
    top: '190px',
    left: '505px',
    backgroundColor: '#F7D703',
    borderRadius: '15px',
    width: '215px',
    height: '270px'
  },
  chatroomMonitorText: {
    fontSize: '12px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '-10px',
    left: '10px'
  },
  chatroomMonitorWhite: {
    position: 'absolute',
    top: '35px',
    left: '9px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    width: '198px',
    height: '220px'
  },
  selectInstructorChatroom: {
    position: 'absolute',
    top: '8px',
    left: '43px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    width: '115px',
    height: '20px',
    border: '1px solid black'
  },
  selectInstructorChatroomText: {
    position: 'absolute',
    top: '-12px',
    left: '6px',
    fontSize: '10px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
  },
  chatroomStudentA: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '60px',
    left: '20px',
    width: '170px',
    height: '65px'
  },
  chatroomStudentB: {
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    position: 'absolute',
    top: '135px',
    left: '20px',
    width: '170px',
    height: '65px'
  },
  student1Chat: {
    fontSize: '9px',
    position: 'absolute',
    top: '33px',
    left: '12px'
  },
  chatroomViewButton: {
    backgroundColor: 'black',
    borderRadius: '15px',
    width: '50px',
    height: '15px',
    position: 'absolute',
    top: '47px',
    left: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatroomViewButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px'
  },
  chatroomReportButton: {
    backgroundColor: 'rgb(250, 2, 2)',
    borderRadius: '15px',
    width: '50px',
    height: '15px',
    position: 'absolute',
    top: '47px',
    left: '115px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatroomReportButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px'
  },
  chatroomHistory: {
    fontSize: '10px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    position: 'absolute',
    top: '25px',
    left: '55px'
  },
  recordingsDraftBox: {
    position: 'absolute',
    top: '130px',
    left: '53px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    width: '20px',
    height: '20px'
  },
  recordingsDraft: {
    position: 'absolute',
    top: '2px',
    left: '2.5px',
    borderRadius: '15px',
    width: '16px',
    height: '16px'
  },
  recordingsPlusBox: {
    position: 'absolute',
    top: '130px',
    left: '80px',
    backgroundColor: 'rgb(199, 199, 204)',
    borderRadius: '15px',
    width: '20px',
    height: '20px'
  },
  recordingsPlus: {
    position: 'absolute',
    top: '2px',
    left: '2.5px',
    borderRadius: '15px',
    width: '15px',
    height: '15px'
  },
  adminDraft: {
    position: 'absolute',
    top: '5px',
    left: '220px',
    borderRadius: '15px',
    width: '22px',
    height: '22px'
  },
  managedInstructorsDraft: {
    position: 'absolute',
    top: '5px',
    left: '200px',
    borderRadius: '15px',
    width: '22px',
    height: '22px'
  },
  managedStudentsDraft: {
    position: 'absolute',
    top: '5px',
    left: '200px',
    borderRadius: '15px',
    width: '22px',
    height: '22px'
  },
  studentSettings: {
    position: 'absolute',
    top: '5px',
    left: '150px',
    borderRadius: '15px',
    width: '16px',
    height: '16px'
  },
  adminProfile: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  instructorProfile: {
    position: 'absolute',
    top: '-5px',
    left: '5px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  communicationAdminA: {
    position: 'absolute',
    top: '15px',
    left: '20px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  communicationAdminB: {
    position: 'absolute',
    top: '15px',
    left: '80px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  studentProfileManaged: {
    position: 'absolute',
    top: '-5px',
    left: '2px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  studentProfileChatroom: {
    position: 'absolute',
    top: '-6px',
    left: '1px',
    borderRadius: '15px',
    width: '60px',
    height: '60px'
  },
  selectClassArrow: {
    position: 'absolute',
    top: '4px',
    left: '82px',
    width: '27px',
    height: '11px'
  },
  selectInstructorArrow1: {
    position: 'absolute',
    top: '4px',
    left: '92px',
    width: '20px',
    height: '11px'
  },
  selectInstructorArrow2: {
    position: 'absolute',
    top: '5px',
    left: '92px',
    width: '20px',
    height: '11px'
  },
  body: {
    backgroundColor: '#f7f7e7'
  }
};


const AdminDashboard = () => {
  //Storage of response information
  const [adminInfo, setAdminInfo] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [courseMaterialData, setCourseMaterialData] = useState(null);
  const [chatroomMonitorData, setChatroomMonitorData] = useState(null);
  //State of opening admin info using the button.
  const [isAdminInfoOpened, setIsAdminInfoOpened] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminInfoResponse, courseMaterialDataResponse, instructorDataResponse, chatroomMonitorDataResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/admin-info"),
          axios.get("http://localhost:3000/api/course-materials"),
          axios.get("http://localhost:3000/api/instructors"),
          axios.get("http://localhost:3000/api/chatroom-monitor"),
        ]);
  
        setAdminInfo(adminInfoResponse.data);
        setCourseMaterialData(courseMaterialDataResponse.data);
        setInstructorData(instructorDataResponse.data);
        setChatroomMonitorData(chatroomMonitorDataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };
  
    fetchData();
  }, []);
  

  const displayAdminInfo = () => {
    setIsAdminInfoOpened(!isAdminInfoOpened);
  };

  //const instructorDataEntries = Object.entries(instructorData);
  //const instructorADataEntries = Object.entries(instructorDataEntries[0]);
  //const instructorBDataEntries = Object.entries(instructorDataEntries[1]);
  //const courseMaterialDataEntries = Object.entries(courseMaterialData);
  //const chatroomMonitorDataEntries = Object.entries(chatroomMonitorData);
  
  return (
    <>
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <div style={styles.header}>Admin Dashboard</div>
      <div style={styles.subheader}>Subheader</div>
      <div style={styles.adminInfo}>
        <div style={styles.adminInfoDetails}>Admin Info</div>
        <div>{isAdminInfoOpened && (
            <>
              <ul>
                <li>Name: {adminInfo.name}</li>
                <li>Role: {adminInfo.role}</li>
                <li>Email: {adminInfo.email}</li>
              </ul>
            </>
          )}</div>
        <div style={styles.adminViewBtn} onClick = {displayAdminInfo}>
          <div style={styles.adminViewText}>{isAdminInfoOpened ? "Close" : "View" }</div>
        </div>
      </div>
      <div style={styles.managedInstructors}>
        <div style={styles.managedInstructorsText}>Managed Instructors</div>
        <div style={styles.instructorA}>
          <div style={styles.instructor1}>Instructor A</div>
           {
            <ul>
              {/*instructorADataEntries.map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))*/}
            </ul>
          } 
        </div>
        <div style={styles.instructorB}>
          <div style={styles.instructor2}>Instructor B</div>
          {
            <ul>
              {/*instructorBDataEntries.map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))*/}
            </ul>
          } 
        </div>
      </div>
      <div style={styles.communication}>
        <div style={styles.communicationText}>Communication</div>
        <div style={styles.adminA}>Admin A</div>
        <div style={styles.adminB}>Admin B</div>
        <div style={styles.communicationViewBtn}>
          <div style={styles.communicationViewText}>View</div>
        </div>
      </div>
      <div style={styles.courseMaterials}>
        <div style={styles.courseMaterialsText}>Course Materials</div>
        <div style={styles.courseMaterialsWhite}>
          <div style={styles.lessonRecordings}>
            <div style={styles.lessonRecordingsText}>Lesson Recordings</div>
            {
            <ul>
              {/*courseMaterialDataEntries.map(courseMaterial => {
                cMdataEntries = Object.entries(courseMaterial);
                cMdataEntries.map(([key, value]) => (<>
                  <li key={key}>{key}: {value}</li>
                </>));
              })*/}
            </ul>
            } 
          </div>
          <div style={styles.publishedAssignments}>
            <div style={styles.publishedAssignmentsText}>Published Assignments</div>
          </div>
        </div>
      </div>
      <div style={styles.managedStudents}>
        <div style={styles.managedStudentsText}>Managed Students</div>
        <div style={styles.studentA}>
          <div style={styles.student1}>Student A</div>
        </div>
        <div style={styles.studentB}>
          <div style={styles.student2}>Student B</div>
        </div>
      </div>
      <div style={styles.chatroomMonitor}>
        <div style={styles.chatroomMonitorText}>Chatroom Monitor</div>
        <div style={styles.chatroomMonitorWhite}>
          <div style={styles.selectInstructorChatroom}>
            <div style={styles.selectInstructorChatroomText}>Select Instructor</div>
          </div>
          <div style={styles.chatroomStudentA}>
            <div style={styles.student1Chat}>Student A</div>
            <div>
              <ul>
                {/*chatroomMonitorDataEntries.map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))*/}
              </ul>
            </div>
          </div>
          <div style={styles.chatroomViewButton}>
            <div style={styles.chatroomViewButtonText}>View</div>
          </div>
          <div style={styles.chatroomReportButton}>
            <div style={styles.chatroomReportButtonText}>Report</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

ReactDOM.render(<AdminDashboard />, document.getElementById('root'));

export default AdminDashboard;
