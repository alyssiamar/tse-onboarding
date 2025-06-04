import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

export interface User {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

export interface CreateUserRequest {
  name: string;
  profilePictureURL?: string;
}

export interface UserJSON {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

export function parseUser(user: UserJSON): User {
  return {
    _id: user._id,
    name: user.name,
    profilePictureURL: user.profilePictureURL,
  };
}

export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
