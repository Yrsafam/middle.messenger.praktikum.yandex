import { isErrorValidation } from "../api/BaseAPI.ts";
import { userApi, UserAPI } from "../api/UserAPI.ts";
import { User } from "../shared-kernel/types.ts";

export class UserController {
  private api: UserAPI;

  constructor() {
    this.api = userApi;
  }

  async updateProfile(data: Omit<User, "id" | "avatar">) {
    try {
      await this.api.update(data);
    } catch (e) {
      if (isErrorValidation(e)) {
        alert(`Произошла ошибка обновления профиля: ${e.reason}`);
      }
    }
  }
}

export const userController = new UserController();
