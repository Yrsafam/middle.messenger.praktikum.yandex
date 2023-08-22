import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {}

export class Messages extends Block<Props> {
  static componentName = "Messages";

  protected render() {
    return this.compile(template, this.props);
  }
}
