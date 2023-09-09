import { BaseAPI } from "./BaseAPI.ts";
import { User } from "../shared-kernel/types.ts";

export type UserPassword = {
  oldPassword: string;
  newPassword: string;
};

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  getById(id: number) {
    return this.httpClient.get<User>(`/${id}`);
  }

  update(data: Omit<User, "id" | "avatar">): Promise<User> {
    return this.httpClient.put("/profile", { data });
  }

  updateAvatar(data: FormData) {
    return this.httpClient.put<User>("/profile/avatar", { data });
  }

  updatePassword(data: UserPassword) {
    return this.httpClient.put<never>("/password", { data });
  }

  searchByLogin(login: string) {
    return this.httpClient.post<User>("/search", { data: { login } });
  }

  create = undefined;

  read = undefined;

  delete = undefined;
}

export const userApi = new UserAPI();
