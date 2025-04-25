// Simulate a user database using localStorage

// Initialize local storage with some default users if it doesn't exist
const initializeUserDb = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { 
        id: '1', 
        username: 'admin', 
        password: 'admin123', // In a real app, this would be hashed
        email: 'admin@example.com',
        role: 'admin'
      },
      { 
        id: '2', 
        username: 'user', 
        password: 'user123', 
        email: 'user@example.com',
        role: 'user'
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

// Get all users
export const getUsers = () => {
  initializeUserDb();
  return JSON.parse(localStorage.getItem('users')) || [];
};

// Find user by username
export const findUserByUsername = (username) => {
  const users = getUsers();
  return users.find(user => user.username === username);
};

// Add a new user
export const addUser = (user) => {
  const users = getUsers();
  
  // Check if username already exists
  if (users.some(existingUser => existingUser.username === user.username)) {
    throw new Error('Username already exists');
  }
  
  // Add a new user with a unique ID
  const newUser = {
    ...user,
    id: Date.now().toString(),
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

// Update user
export const updateUser = (userId, updatedData) => {
  const users = getUsers();
  const updatedUsers = users.map(user => 
    user.id === userId ? { ...user, ...updatedData } : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return updatedUsers.find(user => user.id === userId);
};

// Delete user
export const deleteUser = (userId) => {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.id !== userId);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};

// Simple password verification (in a real app, use proper password hashing)
export const verifyPassword = (user, password) => {
  return user && user.password === password;
};
