import { BaseAPI } from "./BaseAPI.ts";
import { User } from "../shared-kernel/types.ts";

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
};

type ResponseToken = {
  token: string;
};

export type ChatUserData = {
  users: number[];
  chatId: number;
};

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.httpClient.post<never>("/", { data: { title } });
  }

  read() {
    return this.httpClient.get<Chat[]>("/");
  }

  delete(id: number) {
    return this.httpClient.delete<never>("/", { data: { chatId: id } });
  }

  async getToken(id: number) {
    const response = await this.httpClient.post<ResponseToken>(`/token/${id}`);

    return response.token;
  }

  addUser(data: ChatUserData) {
    return this.httpClient.put<never>("/users", { data });
  }

  deleteUser(data: ChatUserData) {
    return this.httpClient.delete<never>("/users", { data });
  }

  update = undefined;
}

export const chatsAPI = new ChatsAPI();
