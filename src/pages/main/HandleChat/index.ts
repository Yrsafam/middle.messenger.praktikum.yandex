import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {}

export class HandleChat extends Block<Props> {
  static componentName = "HandleChat";

  protected render() {
    return this.compile(template, this.props);
  }
}
