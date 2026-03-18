export const users = [
  { id: 1, name: "Sarah Mitchell",   email: "s.mitchell@caccoach.ca",  role: "admin",   status: "active",   department: "Coach Development",    lastLogin: "2026-03-17 08:42", joinDate: "2021-04-10" },
  { id: 2, name: "James Okafor",     email: "j.okafor@caccoach.ca",    role: "manager", status: "active",   department: "Certification",        lastLogin: "2026-03-17 09:15", joinDate: "2020-11-03" },
  { id: 3, name: "Priya Nair",       email: "p.nair@caccoach.ca",      role: "analyst", status: "active",   department: "Systems & Technology", lastLogin: "2026-03-16 14:30", joinDate: "2022-01-18" },
  { id: 4, name: "Tom Beauchamp",    email: "t.beauchamp@caccoach.ca", role: "viewer",  status: "active",   department: "Coach Development",    lastLogin: "2026-03-15 11:00", joinDate: "2023-06-01" },
  { id: 5, name: "Amina Hassan",     email: "a.hassan@caccoach.ca",    role: "manager", status: "inactive", department: "Safe Sport",           lastLogin: "2026-02-28 16:00", joinDate: "2019-08-22" },
  { id: 6, name: "Derek Fontaine",   email: "d.fontaine@caccoach.ca",  role: "analyst", status: "active",   department: "Certification",        lastLogin: "2026-03-17 07:55", joinDate: "2022-09-14" },
  { id: 7, name: "Liu Wei",          email: "l.wei@caccoach.ca",       role: "viewer",  status: "suspended",department: "Systems & Technology", lastLogin: "2026-03-01 09:00", joinDate: "2023-03-07" },
  { id: 8, name: "Fatima Al-Rashid", email: "f.alrashid@caccoach.ca",  role: "admin",   status: "active",   department: "Safe Sport",           lastLogin: "2026-03-17 10:22", joinDate: "2020-05-19" },
  { id: 9, name: "Carlos Reyes",     email: "c.reyes@caccoach.ca",     role: "viewer",  status: "active",   department: "Coach Development",    lastLogin: "2026-03-14 13:45", joinDate: "2024-01-08" },
  { id: 10, name: "Nina Petrov",     email: "n.petrov@caccoach.ca",    role: "analyst", status: "inactive", department: "Certification",        lastLogin: "2026-03-05 08:30", joinDate: "2021-12-01" },
];

export const rolePermissions = {
  admin:   { label: "Admin",   color: "#7c3aed", bg: "#f5f3ff", permissions: ["View all records", "Edit user profiles", "Assign roles", "Export data", "Manage system settings"] },
  manager: { label: "Manager", color: "#0369a1", bg: "#f0f9ff", permissions: ["View all records", "Edit user profiles", "View reports"] },
  analyst: { label: "Analyst", color: "#0f766e", bg: "#f0fdfa", permissions: ["View all records", "Run reports", "Export data"] },
  viewer:  { label: "Viewer",  color: "#92400e", bg: "#fffbeb", permissions: ["View own records only"] },
};

export const auditLog = [
  { id: 1, action: "Role changed",    user: "Liu Wei",          changedBy: "B. Paul", from: "analyst", to: "viewer",   timestamp: "2026-03-01 09:12", reason: "Access review — role mismatch" },
  { id: 2, action: "Account suspended", user: "Liu Wei",        changedBy: "B. Paul", from: "active",  to: "suspended",timestamp: "2026-03-01 09:14", reason: "Policy violation under review" },
  { id: 3, action: "Role changed",    user: "Carlos Reyes",     changedBy: "B. Paul", from: "analyst", to: "viewer",   timestamp: "2026-03-08 14:00", reason: "New hire — provisional access" },
  { id: 4, action: "Account created", user: "Carlos Reyes",     changedBy: "B. Paul", from: "-",       to: "viewer",   timestamp: "2026-01-08 10:30", reason: "New staff onboarding" },
  { id: 5, action: "Status changed",  user: "Amina Hassan",     changedBy: "B. Paul", from: "active",  to: "inactive", timestamp: "2026-03-01 11:00", reason: "Parental leave — temporary deactivation" },
  { id: 6, action: "Role changed",    user: "Priya Nair",       changedBy: "B. Paul", from: "viewer",  to: "analyst",  timestamp: "2026-02-15 09:00", reason: "Promotion — expanded responsibilities" },
];
