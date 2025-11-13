/**
 * User class for managing user data
 */
class User {
  // Static property
  static MAX_LOGIN_ATTEMPTS = 3;

  /**
   * Constructor
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {number} age - User's age
   */
  constructor(name, email, age = 18) {
    this._name = name;
    this._email = email;
    this._age = age;
    this.isActive = true;
    this.loginAttempts = 0;
  }

  /**
   * Get user name
   */
  get name() {
    return this._name;
  }

  /**
   * Get user email
   */
  get email() {
    return this._email;
  }

  /**
   * Get user age
   */
  get age() {
    return this._age;
  }

  /**
   * Get user information
   * @returns {Object} User information object
   */
  getInfo() {
    return {
      name: this._name,
      email: this._email,
      age: this._age,
      status: this.isActive ? 'active' : 'inactive',
      loginAttempts: this.loginAttempts
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  _validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Set new email
   * @param {string} newEmail - New email address
   * @throws {Error} If email is invalid
   */
  setEmail(newEmail) {
    if (this._validateEmail(newEmail)) {
      this._email = newEmail;
      console.log(`Email updated successfully to ${newEmail}!`);
    } else {
      throw new Error('Invalid email format');
    }
  }

  /**
   * Calculate birth year
   * @returns {number} Birth year
   */
  getBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._age;
  }

  /**
   * String representation
   * @returns {string}
   */
  toString() {
    return `User(${this._name}, ${this._email})`;
  }
}

/**
 * UserManager for handling multiple users
 */
class UserManager {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  /**
   * Add a new user
   * @param {User} user - User to add
   * @returns {number} User ID
   */
  addUser(user) {
    const id = this.nextId++;
    this.users.set(id, user);
    return id;
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {User|undefined}
   */
  getUser(id) {
    return this.users.get(id);
  }

  /**
   * Get all active users
   * @returns {Array<User>}
   */
  getActiveUsers() {
    return Array.from(this.users.values())
      .filter(user => user.isActive);
  }

  /**
   * Get users by age range
   * @param {number} minAge - Minimum age
   * @param {number} maxAge - Maximum age
   * @returns {Array<User>}
   */
  getUsersByAgeRange(minAge, maxAge) {
    return Array.from(this.users.values())
      .filter(user => user.age >= minAge && user.age <= maxAge);
  }
}

// Async function example
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Arrow function examples
const calculateAge = (birthYear) => {
  return new Date().getFullYear() - birthYear;
};

const isAdult = (age) => age >= 18;

// Destructuring and spread operator
const displayUser = ({ name, email, age, ...rest }) => {
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Age: ${age}`);
  console.log('Other properties:', rest);
};

// Template literals and array methods
const formatUsers = (users) => {
  return users
    .map(user => `${user.name} (${user.email})`)
    .join(', ');
};

// Usage example
if (typeof window !== 'undefined') {
  // Browser environment
  const manager = new UserManager();

  const user1 = new User('John Doe', 'john@example.com', 25);
  const user2 = new User('Jane Smith', 'jane@example.com', 30);

  manager.addUser(user1);
  manager.addUser(user2);

  // Get active users
  const activeUsers = manager.getActiveUsers();
  console.log('Active users:', formatUsers(activeUsers));

  // Array iteration
  activeUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.toString()}`);
  });

  // Promise chain
  fetchUserData(1)
    .then(data => console.log('Fetched user:', data))
    .catch(err => console.error('Error:', err));
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { User, UserManager, fetchUserData };
}

export { User, UserManager, fetchUserData };
