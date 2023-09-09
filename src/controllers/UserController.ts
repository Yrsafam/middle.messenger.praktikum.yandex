import { isErrorValidation } from "../api/BaseAPI.ts";
import { userApi, UserAPI } from "../api/UserAPI.ts";
import { User } from "../shared-kernel/types.ts";
import { Routes } from "../utils/renderDom.ts";
import router from "../utils/Router.ts";
import { store } from "../utils/Store.ts";

export class UserController {
  private api: UserAPI;

  constructor() {
    this.api = userApi;
  }

  async updateProfile(data: Omit<User, "id" | "avatar">) {
    try {
      const response = await this.api.update(data);

      router.go(Routes.Settings);
      store.set("user", response);
    } catch (e) {
      if (isErrorValidation(e)) {
        alert(`Произошла ошибка обновления профиля: ${e.reason}`);
      }
    }
  }
}

export const userController = new UserController();
