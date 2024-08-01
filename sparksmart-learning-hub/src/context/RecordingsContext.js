import React, { createContext, useState } from 'react';

export const RecordingsContext = createContext();

export const RecordingsProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([
    { id: 1, title: 'Prelude - Coding Basics', description: 'Introduction to basic coding concepts.', instructor: 'Instructor A' },
    { id: 2, title: 'Lesson 1 - Intro to Java', description: 'Overview of Java programming language.', instructor: 'Instructor A' },
    { id: 3, title: 'Lesson 2 - Variables and Types', description: 'Understanding variables and data types.', instructor: 'Instructor A' },
    { id: 4, title: 'Lesson 3 - Basic Arithmetic', description: 'Arithmetic operations in Java.', instructor: 'Instructor B' },
    { id: 5, title: 'Lesson 4 - Arrays', description: 'Working with arrays in Java.', instructor: 'Instructor B' },
    { id: 6, title: 'Lesson 5 - Branch Statements', description: 'Using if-else and switch statements.', instructor: 'Instructor B' },
  ]);

  return (
    <RecordingsContext.Provider value={{ recordings, setRecordings }}>
      {children}
    </RecordingsContext.Provider>
  );
};
