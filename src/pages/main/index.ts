import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { withStore } from "../../utils/Store.ts";
import { Chat } from "../../api/ChatsAPI.ts";
import { chatsController } from "../../controllers/ChatsController.ts";
import { User } from "../../shared-kernel/types.ts";

interface Props {
  chats: Chat[];
  user: User;
  visibleChatAdd?: boolean;
  onShowModalAddChat?(): void;
  onHideModalAddChat?(): void;
  value?: string;
  onChange?(event: Event): void;
  onAddChat?(): void;
}

class MainBlock extends Block<Props> {
  static componentName = "Main";

  constructor(props: Props) {
    super({
      ...props,
      visibleChatAdd: false,
      value: "",
      onShowModalAddChat: () => this.onShowModalAddChat(),
      onHideModalAddChat: () => this.onHideModalAddChat(),
      onChange: (event) => this.onChange(event),
      onAddChat: () => this.onAddChat(),
    });
  }

  protected async init() {
    await chatsController.fetchChats();
  }

  private onShowModalAddChat() {
    this.setProps({ ...this.props, visibleChatAdd: true });
  }

  private onHideModalAddChat() {
    this.setProps({ ...this.props, visibleChatAdd: false, value: "" });
  }

  private clearValue() {
    this.setProps({ ...this.props, value: "" });
  }

  private onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.setProps({ ...this.props, value: target.value });
  }

  private async onAddChat() {
    await chatsController.create(this.props.value!);

    this.clearValue();
    this.onHideModalAddChat();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  user: state.user,
}));

export const Main = withChats(MainBlock);
