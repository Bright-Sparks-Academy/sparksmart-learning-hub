const roles = {
    members: ["dannywchen1@gmail.com", "member2@example.com"],
    students: ["dannywchen3@gmail.com", "student2@example.com"],
    teachers: ["dragosmasterz03@gmail.com", "teacher2@example.com"],
    admins: ["admin1@example.com", "admin2@example.com"]
  };
  
  const getRole = (email) => {
    if (roles.admins.includes(email)) return "admin";
    if (roles.teachers.includes(email)) return "teacher";
    if (roles.students.includes(email)) return "student";
    if (roles.members.includes(email)) return "member";
    return null;
  };
  
  export { getRole };
  