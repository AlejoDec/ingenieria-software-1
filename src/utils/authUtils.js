import { findUserByUsername, verifyPassword } from './userDb';

export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

export const authenticateUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { username, password } = credentials;
      
      // Find user in our database
      const user = findUserByUsername(username);
      
      // Verify password
      if (user && verifyPassword(user, password)) {
        // Create JWT token
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
          sub: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
          exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
        }));
        const signature = btoa('signature'); // In a real app, this would be properly signed
        
        resolve({
          token: `${header}.${payload}.${signature}`,
          user: { 
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 500);
  });
};

// Register a new user
export const registerUser = async (userData) => {
  // This would be an API call in a real application
  // For this simulation, we'll import the addUser function
  const { addUser } = await import('./userDb');
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const newUser = addUser(userData);
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};
