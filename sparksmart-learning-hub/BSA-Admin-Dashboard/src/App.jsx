import "./App.css"
import profile from "./Icons/profile-pic.png"
import plus from "./Icons/Plus.png"
import draft from "./Icons/draft2.png"
import settings from "./Icons/settings.png"
import arrow from "./Icons/arrow.png"

export default function App(){
  return (
    <>
    <h1 className="header">Admin Dashboard</h1>
    <h2 className="subheader">Admin Names's Profile</h2>

    <div className="admin-info">

      <img src = {profile} alt = "Description" className="admin-profile"/>

      <img src = {draft} alt = "Description" className="admin-draft"/>
      
      <h6 className="admin-info-details">Admin: Teacher Name</h6>
      <h6 className="admin-info-details">User ID: UserID</h6>
      <h6 className="admin-info-details">Phone: +1 800-000-0000</h6>
      <h6 className="admin-info-details">Last Joined: 5/24/24</h6>
      <h6 className="admin-info-details">Email: example@site.com</h6>

      <div className="admin-view-btn">
        <h5 className="admin-view-text">View</h5>
      </div>

    </div>

    <div className="managed-instructors">
      <h1 className="managed-instructors-text">Managed Instructors</h1>

      <img src = {draft} alt = "Description" className="managed-instructors-draft"/>

      <div className="instructor-a">

        <img src = {profile} alt = "Description" className="instructor-profile"/>

        <h6 className="instructor-1">Instructor A</h6>
        <h6 className="instructor-2">Class: Java</h6>
        <h6 className="instructor-2">Recordings: 11</h6>
        <h6 className="instructor-2">Students: 2</h6>
        <h6 className="instructor-3">Class Avg</h6>
        <h6 className="instructor-4">B</h6>
        <h6 className="instructor-5">85.28%</h6>

        <div className="instructor-view-btn">
          <h5 className="instructor-view-text">View</h5>
        </div>
      </div>

      <div className="instructor-b">
        <img src = {profile} alt = "Description" className="instructor-profile"/>

        <h6 className="instructor-1">Instructor B</h6>
        <h6 className="instructor-2">Class: Math 3</h6>
        <h6 className="instructor-2">Recordings: 11</h6>
        <h6 className="instructor-2">Students: 2</h6>
        <h6 className="instructor-3">Class Avg</h6>
        <h6 className="instructor-4">B</h6>
        <h6 className="instructor-5">85.28%</h6>

        <div className="instructor-view-btn">
          <h5 className="instructor-view-text">View</h5>
        </div>
      </div>
    </div>

    <div className="communication">
      <h4 className="communication-text">Communication</h4>

      <img src = {profile} alt = "Description" className="communication-admin-a"/>
      <img src = {profile} alt = "Description" className="communication-admin-b"/>

      <h4 className="admin-a">Admin A</h4>
      <h4 className="admin-b">Admin B</h4>

      <div className="communication-view-btn">
        <h5 className="communication-view-text">View</h5>
      </div>
    </div>

    <div className="course-materials">
      <h5 className="course-materials-text">Course Materials</h5>

      <div className="course-materials-white">

        <div className="select-class">
          <h4 className="select-class-text">Select Class</h4>
          <img src = {arrow} alt = "Description" className="select-class-arrow"/>
        </div>

        <div className="lesson-recordings">
          <h5 className="lesson-recordings-text">Lesson Recordings</h5>

          <div className="recording-1">
            <h5 className="recording-number">Recording 1: TITLE</h5>
            <h5 className="recording-date">6/22/24</h5>
          </div>

          <div className="recording-2">
            <h5 className="recording-number">Recording 2: TITLE</h5>
            <h5 className="recording-date">6/27/24</h5>
          </div>

          <div className="recording-3">
            <h5 className="recording-number">Recording 3: TITLE</h5>
            <h5 className="recording-date">7/3/24</h5>
          </div>

          <div className="recordings-draft-box">
            <img src = {draft} alt = "Description" className="recordings-draft"/>
          </div>

          <div className="recordings-plus-box">
            <img src = {plus} alt = "Description" className="recordings-plus"/>
          </div>
        </div>
        <div className="published-assignments">
          <h5 className="published-assignments-text">Published Assignments</h5>

          <div className="homework-1">
            <h6 className="homework-number">Homework 1</h6>
            <h6 className="homework-date">07/22</h6>

            <div className="homework-view">
              <h6 className="homework-view-text">View</h6>
            </div>
          </div>

          <div className="homework-2">
            <h6 className="homework-number">Homework 2</h6>
            <h6 className="homework-date">07/22</h6>

            <div className="homework-view">
              <h6 className="homework-view-text">View</h6>
            </div>
          </div>

          {/* <div className="homework-3">
            <h6 className="homework-number">Homework 3</h6>
            <h6 className="homework-date">07/22</h6>

            <div className="homework-view">
              <h6 className="homework-view-text">View</h6>
            </div>
          </div> */}

          <div className="recordings-draft-box">
          <img src = {draft} alt = "Description" className="recordings-draft"/>
          </div>

          <div className="recordings-plus-box">
            <img src = {plus} alt = "Description" className="recordings-plus"/>
          </div>
        </div>

      </div>
    </div>

    <div className="managed-students">
      <h5 className="managed-students-text">Managed Students</h5>

      <img src = {draft} alt = "Description" className="managed-students-draft"/>

      <div className="select-instructor-students">
        <h5 className="select-instructor-students-text">Select Instructor</h5>
        <img src = {arrow} alt = "Description" className="select-instructor-arrow-1"/>
        </div>

        <div className="student-a">

          <img src = {profile} alt = "Description" className="student-profile-managed"/>

          <h6 className="student-1">Student A</h6>
          <h6 className="student-2">Class: Java</h6>
          <h6 className="student-2">Assignments: 2</h6>
          <h6 className="student-2">Joined: 6/1/24</h6>
          <h6 className="student-4">A</h6>
          <h6 className="student-5">99.28%</h6>

          <div className="student-view-btn">
            <h5 className="student-view-text">View</h5>
          </div>
      </div>

      <div className="student-b">

          <img src = {profile} alt = "Description" className="student-profile-managed"/>

          <h6 className="student-1">Student B</h6>
          <h6 className="student-2">Class: Java</h6>
          <h6 className="student-2">Assignments: 2</h6>
          <h6 className="student-2">Joined: 6/1/24</h6>
          <h6 className="student-4">C+</h6>
          <h6 className="student-5">79.28%</h6>

          <div className="student-view-btn">
            <h5 className="student-view-text">View</h5>
          </div>
      </div>
      
    </div>

    <div className="chatroom-monitor">
      <h5 className="chatroom-monitor-text">Chatroom Monitor</h5>

      <div className="chatroom-monitor-white">
        <div className="select-instructor-chatroom">
          <h5 className="select-instructor-chatroom-text">Select Instructor</h5>
          <img src = {arrow} alt = "Description" className="select-instructor-arrow-2"/>
        </div>

        <h5 className="chatroom-history">Chatroom History</h5>
        <div className="chatroom-student-a">
          <img src = {settings} alt = "Description" className="student-settings"/>
          <img src = {profile} alt = "Description" className="student-profile-chatroom"/>

          <h5 className="student-1-chat">Student A</h5>
          <h5 className="student-2">Class: Java</h5>
          <h5 className="student-2">Started: 6/1/24</h5>
          <h5 className="student-2">Messages: 47</h5>

          <div className="chatroom-view-button">
            <h5 className="chatroom-view-button-text">View</h5>
          </div>

          <div className="chatroom-report-button">
            <h5 className="chatroom-report-button-text">Report</h5>
          </div>
        </div>

        <div className="chatroom-student-b">
          <img src = {settings} alt = "Description" className="student-settings"/>
          <img src = {profile} alt = "Description" className="student-profile-chatroom"/>

          <h5 className="student-1-chat">Student B</h5>
          <h5 className="student-2">Class: Java</h5>
          <h5 className="student-2">Started: 6/1/24</h5>
          <h5 className="student-2">Messages: 36</h5>

          <div className="chatroom-view-button">
            <h5 className="chatroom-view-button-text">View</h5>
          </div>

          <div className="chatroom-report-button">
            <h5 className="chatroom-report-button-text">Report</h5>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}