import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { withStore } from "../../utils/Store.ts";
import { Chat } from "../../api/ChatsAPI.ts";
import { chatsController } from "../../controllers/ChatsController.ts";

interface Props {
  chats: Chat[];
  visibleChatAdd?: boolean;
  onShowModalAddChat?(): void;
  onHideModalAddChat?(): void;
}

class MainBlock extends Block<Props> {
  static componentName = "Main";

  constructor(props: Props) {
    super({
      ...props,
      visibleChatAdd: false,
      onShowModalAddChat: () => this.onShowModalAddChat(),
      onHideModalAddChat: () => this.onHideModalAddChat(),
    });
  }

  protected async init() {
    await chatsController.fetchChats();
  }

  private onShowModalAddChat() {
    this.setProps({ ...this.props, visibleChatAdd: true });
  }

  private onHideModalAddChat() {
    this.setProps({ ...this.props, visibleChatAdd: false });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
}));

export const Main = withChats(MainBlock);
