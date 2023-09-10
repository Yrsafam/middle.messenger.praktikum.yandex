import { User } from "../shared-kernel/types.ts";
import { HTTPTransport } from "./HTTPTransport.ts";
import { Chat } from "../api/ChatsAPI.ts";
import { Message } from "../controllers/MessagesController.ts";

export function getFormattedUser(user: User): User {
  return {
    ...user,
    avatar: HTTPTransport.RESOURCE_URL + user.avatar,
  };
}

export type ChatView = {
  id: number;
  name: string;
  message: string;
  lastTime: string;
  count: number;
  isMe: boolean;
};

export function getFormattedChats(chats: Chat[], userId: number): ChatView[] {
  return chats.map((chat) => ({
    id: chat.id,
    name: chat.title,
    message: chat.last_message?.content ?? "",
    lastTime: chat.last_message?.time ?? "",
    count: chat.unread_count,
    isMe: chat.last_message?.user.id === userId,
  }));
}

export type MessageView = {
  id: number;
  userId: number;
  isMe: boolean;
  photo: string;
  message: string;
  time: string;
};

export function getFormattedMessages(
  messages: Message[],
  userId: number,
): MessageView[] {
  return messages.map((message) => ({
    id: message.chat_id,
    userId: message.user_id,
    isMe: message.user_id === userId,
    photo:
      message.type === "file"
        ? `${HTTPTransport.RESOURCE_URL}${message.file?.path}`
        : "",
    message: message.content,
    time: message.time,
  }));
}
