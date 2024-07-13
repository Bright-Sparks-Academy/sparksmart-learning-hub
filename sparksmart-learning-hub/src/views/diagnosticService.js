// src/views/diagnosticService.js

export const checkDiagnosticCompleted = async () => {
  // Example logic to check if the diagnostic is completed
  // This should be replaced with actual logic, e.g., API call or local storage check
  const completed = localStorage.getItem('diagnosticCompleted') === 'true';
  return completed;
};

export const setDiagnosticCompleted = () => {
localStorage.setItem('diagnosticCompleted', 'true');
};