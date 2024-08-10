const roles = {
  members: ["dannywchen1@gmail.com", "member2@example.com"],
  students: ["dannywchen3@gmail.com", "student2@example.com", "tomwang04312@gmail.com", "hemanthnallagatla@gmail.com"],
  teachers: ["dragosmasterz03@gmail.com", "teacher2@example.com", "tomwang22@yahoo.com"],
  admins: ["admin1@example.com", "admin2@example.com", "nikhilsaimunagala@gmail.com", "tw7652112@gmail.com"]
};

const getRole = (email) => {
  if (roles.admins.includes(email)) return "admin";
  if (roles.teachers.includes(email)) return "teacher";
  if (roles.students.includes(email)) return "student";
  if (roles.members.includes(email)) return "member";
  return "student"; // all redirect to become student if not found oon list above
};

export { roles, getRole };