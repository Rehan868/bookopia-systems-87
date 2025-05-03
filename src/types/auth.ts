
export type UserType = 'staff' | 'owner';

export type UserRole = 'admin' | 'agent';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role?: string;
  userType: UserType;
  avatarUrl?: string;
}
