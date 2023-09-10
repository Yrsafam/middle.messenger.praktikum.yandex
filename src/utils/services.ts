import { User } from "../shared-kernel/types.ts";
import { HTTPTransport } from "./HTTPTransport.ts";
import { Chat } from "../api/ChatsAPI.ts";

export function getFormattedUser(user: User): User {
  return {
    ...user,
    avatar: HTTPTransport.RESOURCE_URL + user.avatar,
  };
}

export function getFormattedChats(chats: Chat[], userId: number) {
  return chats.map((chat) => ({
    id: chat.id,
    name: chat.title,
    message: chat.last_message?.content ?? "",
    lastTime: chat.last_message?.time ?? "",
    count: chat.unread_count,
    isMe: chat.last_message?.user.id === userId,
  }));
}
