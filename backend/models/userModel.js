const { v4: uuidv4 } = require('uuid');

// In-memory user store (replace with DB later)
let users = [];

function saveUser(userData) {
  const newUser = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

function getUsers() {
  return users;
}

module.exports = { saveUser, getUsers };
