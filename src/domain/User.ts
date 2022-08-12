export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type UserToCreate = Omit<User, "id">;
export interface UserToGet {
  id: number;
  email: string;
}
