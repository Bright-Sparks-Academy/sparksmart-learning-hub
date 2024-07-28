import { getRole } from '../src/roles.js'; // Adjust the import path

// Middleware to check user role
export const checkUserRole = (req, res, next) => {
  const { userType } = req.params;
  const { email } = req.query; // Assuming email is passed as a query parameter

  if (!userType || (userType !== 'student' && userType !== 'non-student')) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const role = getRole(email);

  if (role !== userType) {
    return res.status(403).json({ error: `Access denied for ${role}` });
  }

  req.userType = userType; // Attach the userType to the request object for further use
  next();
};
