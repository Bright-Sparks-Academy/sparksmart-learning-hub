// Importing the classes from the packages.js file
import { StudentPackage, NonStudentPackage } from './packages.js';

// Function to test the packages
function testPackages() {
  const studentPackage = new StudentPackage();
  console.log('Student Package:', studentPackage);

  const nonStudentPackage = new NonStudentPackage();
  console.log('Non-Student Package:', nonStudentPackage);
}

// Run the test
testPackages();
