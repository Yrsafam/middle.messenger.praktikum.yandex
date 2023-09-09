import { chatsAPI, ChatsAPI } from "../api/ChatsAPI.ts";
import { messagesController } from "./MessagesController.ts";
import { store } from "../utils/Store.ts";

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

    store.set("chats", chats);
  }

  public addUserToChat(id: number, userId: number) {
    this.api.addUser({ users: [userId], chatId: id });
  }

  public deleteUser(id: number, userId: number) {
    this.api.deleteUser({ users: [userId], chatId: id });
  }

  public selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

export const chatsController = new ChatsController();
