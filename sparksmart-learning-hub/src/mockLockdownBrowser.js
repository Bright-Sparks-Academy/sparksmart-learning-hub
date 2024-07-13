// src/mockLockdownBrowser.js

// Mock initialization function
export const initializeLockdownBrowser = () => {
    return new Promise((resolve) => {
      console.log('Mock Lockdown Browser initialized');
      resolve();
    });
  };
  
  // Mock function to check if lockdown browser is active
  export const checkLockdownBrowserActive = () => {
    // Always return true for the mock
    return true;
  };
  