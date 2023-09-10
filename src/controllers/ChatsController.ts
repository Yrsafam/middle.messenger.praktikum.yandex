import { chatsAPI, ChatsAPI } from "../api/ChatsAPI.ts";
import { messagesController } from "./MessagesController.ts";
import { store } from "../utils/Store.ts";
import { getFormattedChats } from "../utils/services.ts";

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = chatsAPI;
  }

  public getToken(id: number) {
    return this.api.getToken(id);
  }

  public async fetchChats() {
    const chats = await this.api.read();

    // eslint-disable-next-line no-restricted-syntax
    for await (const chat of chats) {
      const token = await this.getToken(chat.id);

      await messagesController.connect(chat.id, token);
    }

    store.set("chats", getFormattedChats(chats, store.getState().user.id));
  }

  public async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  public async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUser({ users: [userId], chatId: id });
    } catch (e) {
      alert("Произошла ошибка добавления пользователя");
    }
  }

  public async deleteUser(id: number, userId: number) {
    try {
      await this.api.deleteUser({ users: [userId], chatId: id });
    } catch (e) {
      alert("Произошла ошибка удаления пользователя");
    }
  }

  public selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

export const chatsController = new ChatsController();
