// Base class to define the common structure of a package
class Package {
    /**
     * Constructor to initialize the package
     * @param {string} name - The name of the package
     * @param {string} diagnosticTest - Information about the diagnostic test
     * @param {string} poweredLearningPlans - Information about the learning plans
     * @param {string} consultationCall - Information about the consultation call
     */
    constructor(name, diagnosticTest, poweredLearningPlans, consultationCall) {
      this.name = name;
      this.diagnosticTest = diagnosticTest;
      this.poweredLearningPlans = poweredLearningPlans;
      this.consultationCall = consultationCall;
    }
  }
  
  // Class to define the Student package, inheriting from Package
  class StudentPackage extends Package {
    constructor() {
      // Initializing with specific details for the Student package
      super('Student', 'Included', 'Included', 'Included');
    }
  }
  
  // Class to define the Non-Student package, inheriting from Package
  class NonStudentPackage extends Package {
    constructor() {
      // Initializing with specific details for the Non-Student package
      super('Non-Student', 'Paid', 'Limited', 'Not Included');
    }
  }
  
  // Exporting the classes for use in other parts of the application
  export { StudentPackage, NonStudentPackage };
  