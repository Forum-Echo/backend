// Database Url
export const databaseUrl =
  'mongodb+srv://admin:TWBYJ6KA7o5WZGFx@forumecho.pgc3t9e.mongodb.net/?retryWrites=true&w=majority';

// -------- ROLES -------- //
export interface Role {
  name: string;
  permissions: string[];
  authority: number;
}

// SuspendedUser //
export class SuspendedUser implements Role {
  constructor(name: string) {
    this.name = name;
  }
  authority = 4;
  name: string;
  permissions: string[];
}

// User //
export class User implements Role {
  constructor(name: string) {
    this.name = name;
  }

  name: string;
  authority = 3;
  permissions: string[] = ['create_post', 'delete_own_post', 'vote'];
}

// Moderator //
export class Moderator implements Role {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  permissions: string[] = [
    'create_post',
    'delete_own_post',
    'vote',
    'delete_foreign_post',
    'delete_account',
    'suspend_users',
  ];
  authority = 2;
}

// Admin //
export class Admin implements Role {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  permissions: string[] = [
    'create_post',
    'delete_own_post',
    'vote',
    'delete_foreign_post',
    'delete_account',
    'give_roles',
    'remove_roles',
    'suspend_users',
  ];
  authority = 1;
}
