import { Block } from "../../../utils/Block.ts";
import { chats } from "../../../utils/mocks.ts";
import template from "./template.hbs";

interface Props {}

export class Sidebar extends Block<Props> {
  static componentName = "Sidebar";

  constructor(props: Props) {
    super({ ...props, chats });
  }

  render() {
    return this.compile(template, this.props);
  }
}
