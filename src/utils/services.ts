import { User } from "../shared-kernel/types.ts";
import { HTTPTransport } from "./HTTPTransport.ts";

export function getFormattedUser(user: User): User {
  return {
    ...user,
    avatar: HTTPTransport.RESOURCE_URL + user.avatar,
  };
}
