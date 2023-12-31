import { BaseAPI } from "./BaseAPI.ts";
import { User } from "../shared-kernel/types.ts";

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignupResponse = {
  id: number;
};

export type SigninData = {
  login: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public signup(data: SignupData): Promise<SignupResponse> {
    return this.httpClient.post("/signup", { data });
  }

  public signin(data: SigninData): Promise<unknown> {
    return this.httpClient.post("/signin", { data });
  }

  public logout(): Promise<unknown> {
    return this.httpClient.post("/logout");
  }

  public read(): Promise<User> {
    return this.httpClient.get("/user");
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export const authApi = new AuthAPI();
