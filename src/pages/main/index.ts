import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { withStore } from "../../utils/Store.ts";
import { chatsController } from "../../controllers/ChatsController.ts";
import { User } from "../../shared-kernel/types.ts";
import { ChatView, MessageView } from "../../utils/services.ts";
import { userController } from "../../controllers/UserController.ts";

interface Props {
  chats: ChatView[];
  messages: MessageView[];
  user: User;
  selectedChatId: number | undefined;
  visibleChatAdd?: boolean;
  visibleAddUserChat?: boolean;
  visibleDeleteUserChat?: boolean;
  onShowModalAddChat?(): void;
  onHideModalAddChat?(): void;
  onShowModalAddUserChat?(): void;
  onHideModalAddUserChat?(): void;
  onShowModalDeleteUserChat?(): void;
  onHideModalDeleteUserChat?(): void;
  value?: string;
  onChange?(event: Event): void;
  onAddChat?(): void;
  onSelectChat(id: number): void;
  onAddUserChat(): void;
  onDeleteUserChat(): void;
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
      onSelectChat: (id) => this.onSelectChat(id),
      onShowModalAddUserChat: () => this.onShowModalAddUserChat(),
      onHideModalAddUserChat: () => this.onHideModalAddUserChat(),
      onShowModalDeleteUserChat: () => this.onShowModalDeleteUserChat(),
      onHideModalDeleteUserChat: () => this.onHideModalDeleteUserChat(),
      onAddUserChat: () => this.onAddUserChat(),
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

  private onShowModalAddUserChat() {
    this.setProps({ ...this.props, visibleAddUserChat: true });
  }

  private onHideModalAddUserChat() {
    this.setProps({ ...this.props, visibleAddUserChat: false, value: "" });
  }

  private onShowModalDeleteUserChat() {
    this.setProps({ ...this.props, visibleDeleteUserChat: true });
  }

  private onHideModalDeleteUserChat() {
    this.setProps({ ...this.props, visibleDeleteUserChat: false, value: "" });
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

  private onSelectChat(id: number) {
    chatsController.selectChat(id);
  }

  private async onAddUserChat() {
    if (this.props.selectedChatId) {
      const searchingUser = await userController.getUserByLogin(
        this.props.value!,
      );

      if (searchingUser?.length) {
        await chatsController.addUserToChat(
          this.props.selectedChatId,
          searchingUser[0].id,
        );
        this.onHideModalAddUserChat();
      } else {
        alert("Извините, пользователь не найден");
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      chats: state.chats,
      user: state.user,
      selectedChatId: state.selectedChat,
      messages: [],
    };
  }

  return {
    chats: state.chats,
    user: state.user,
    selectedChatId: state.selectedChat,
    messages: state.messages[selectedChatId],
  };
});

export const Main = withChats(MainBlock);
