import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";
import { Chat } from "../../../api/ChatsAPI.ts";

interface Props {
  chats: Chat[];
}

export class Sidebar extends Block<Props> {
  static componentName = "Sidebar";

  render() {
    return this.compile(template, this.props);
  }
}
