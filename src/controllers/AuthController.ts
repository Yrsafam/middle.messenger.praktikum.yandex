import { authApi, AuthAPI, SigninData, SignupData } from "../api/AuthAPI.ts";
import { store } from "../utils/Store.ts";
import router from "../utils/Router.ts";
import { Routes } from "../utils/renderDom.ts";

export class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = authApi;
  }

  private async fetchUser() {
    const response = await this.api.read();

    store.set("user", response);
  }

  public async checkSignin() {
    await this.fetchUser();
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e) {
      window.alert(`Ошибка регистрации: ${e}`);
    }
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e) {
      window.alert(`Ошибка авторизации: ${e}`);
    }
  }

  public async logout() {
    try {
      // @TODO добавить закрытие сокет соединений

      await this.api.logout();

      router.go(Routes.Main);
    } catch (e) {
      console.log(e);
    }
  }
}

export const authController = new AuthController();
