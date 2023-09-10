import { Block, BlockEvents } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  id: number;
  selectedChatId: number;
  name: string;
  lastTime: string;
  isMe: boolean;
  message: string;
  count: number;
  isActive: boolean;
  onSelectChat(id: number): void;
  avatar: string;
  events?: BlockEvents;
}

export class CardChat extends Block<Props> {
  static componentName = "CardChat";

  constructor({
    id,
    selectedChatId,
    name,
    onSelectChat,
    count,
    isMe,
    message,
    lastTime,
    avatar,
  }: Props) {
    super({
      id,
      avatar,
      selectedChatId,
      name,
      onSelectChat,
      count,
      isMe,
      message,
      lastTime,
      isActive: id === selectedChatId,
      events: {
        click: () => onSelectChat(id),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
