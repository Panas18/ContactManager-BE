import { Request } from "express";
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
  first_name?: string;
  last_name?: string;
}

export default User;

interface AuthorizedRequest extends Request {
  authUser?: number;
}

interface TokenPayload {
  user_id: number;
}

export type DataStoredInToken = TokenPayload;

export type AuthRequest = AuthorizedRequest;
