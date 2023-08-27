import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {}

export class Message extends Block<Props> {
  static componentName = "Message";

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
