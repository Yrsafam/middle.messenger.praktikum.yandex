import { authApi, AuthAPI, SigninData, SignupData } from "../api/AuthAPI.ts";
import { store } from "../utils/Store.ts";
import router from "../utils/Router.ts";
import { Routes } from "../utils/renderDom.ts";
import { getFormattedUser } from "../utils/services.ts";
import { isErrorValidation } from "../api/BaseAPI.ts";

export class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = authApi;
  }

  private async fetchUser() {
    const response = await this.api.read();

    store.set("user", getFormattedUser(response));
  }

  public async checkSignin() {
    await this.fetchUser();
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      router.go(Routes.Settings);

      await this.fetchUser();
    } catch (e) {
      if (isErrorValidation(e)) {
        window.alert(`Ошибка регистрации: ${e.reason}`);
      }
    }
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go(Routes.Settings);

      await this.fetchUser();
    } catch (e) {
      if (isErrorValidation(e)) {
        window.alert(`Ошибка авторизации: ${e.reason}`);
      }
    }
  }

  public async logout() {
    try {
      // @TODO добавить закрытие сокет соединений

      await this.api.logout();

      router.go(Routes.Main);
    } catch (e) {
      alert(`Извините, произошла ошибка`);
    }
  }
}

export const authController = new AuthController();
