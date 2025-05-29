import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

/**
 * Defines the "shape" of a User object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export interface User {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

export interface CreateUserRequest {
  name: string;
  profilePicutreURL?: string;
}

export interface UserJSON {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

export function parseTask(user: UserJSON): User {
  return {
    _id: user._id,
    name: user.name,
    profilePictureURL: user.profilePictureURL,
  };
}

export async function createTask(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseTask(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getTask(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/task/${id}`);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseTask(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
