import { Block } from "../../../utils/Block.ts";
import template from "./template.ts";

interface Props {
  name: string;
  lastTime: string;
  isMe: boolean;
  message: string;
  count: number;
}

export class CardChat extends Block<Props> {
  static componentName = "CardChat";

  render() {
    return this.compile(template, this.props);
  }
}
