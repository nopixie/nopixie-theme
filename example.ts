/**
 * Theme Showcase Example
 * Demonstrates syntax highlighting for the No Pixie theme
 */

type UserRole = 'admin' | 'user' | 'guest';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  metadata?: Record<string, any>;
}

// Constants and variables
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
let retryCount = 0;

/**
 * Generic class demonstrating various syntax elements
 */
class UserService<T extends User> {
  private users: Map<number, T> = new Map();
  protected readonly apiUrl: string;

  constructor(apiUrl: string = API_URL) {
    this.apiUrl = apiUrl;
  }

  /**
   * Fetch user by ID with error handling
   */
  async getUserById(id: number): Promise<T | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json() as T;
      this.users.set(id, user);

      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }

  /**
   * Filter users by role
   */
  filterByRole(role: UserRole): T[] {
    return Array.from(this.users.values())
      .filter(user => user.role === role);
  }

  // Arrow function property
  validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Async/await and promises
async function processUsers(userIds: number[]): Promise<void> {
  const service = new UserService();

  for (const id of userIds) {
    const user = await service.getUserById(id);

    if (user) {
      console.log(`Processing user: ${user.name}`);
    }
  }
}

// Decorator example
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// Enum
enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

// Generics and utility types
function createPair<K extends string | number, V>(key: K, value: V): [K, V] {
  return [key, value];
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type PickUser = Pick<User, 'id' | 'name'>;

// Complex object with various types
const config = {
  env: process.env.NODE_ENV || 'development',
  features: {
    authentication: true,
    logging: false,
    rateLimit: 100
  },
  database: {
    host: 'localhost',
    port: 5432,
    name: 'mydb'
  }
};

// Array methods and callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Template literals
const message = `
  Welcome to the application!
  Current environment: ${config.env}
  Total users: ${numbers.length}
`;

// Conditional and ternary
const isProduction = config.env === 'production';
const logLevel = isProduction ? 'error' : 'debug';

// Switch statement
function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.OK:
      return 'Success';
    case HttpStatus.CREATED:
      return 'Resource created';
    case HttpStatus.NOT_FOUND:
      return 'Not found';
    default:
      return 'Unknown status';
  }
}

// Export
export { UserService, processUsers, HttpStatus };
export default config;
