// Good example

import { User } from './types';

export class UserService {
  private users: User[] = [];

  addUser(name: string, email: string): User {
    const user: User = {
      id: this.users.length + 1,
      name,
      email,
      createdAt: new Date(),
    };
    
    this.users.push(user);
    return user;
  }

  getUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

// Bad example

/*
import { User } from './types';

export class BadUserService {
  private users: User[] = [];

  // Missing return type annotation
  addUser(name: string, email: string) {
    const user = {
      id: this.users.length + 1,
      name,
      email,
      createdAt: new Date(),
    };
    
    console.log('Adding user:', user); // console.log not allowed
    this.users.push(user);
    return user;
  }

  // Using 'any' type
  processData(data: any) {
    return data;
  }

  // Unused parameter
  deleteUser(id: number, force: boolean): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
*/
