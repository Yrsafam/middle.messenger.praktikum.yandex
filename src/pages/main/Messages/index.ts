import { Block } from "../../../utils/Block.ts";
import { messages } from "../../../utils/mocks.ts";
import template from "./template.hbs";

interface Props {}

export class Messages extends Block<Props> {
  static componentName = "Messages";

  constructor(props: Props) {
    super({ ...props, messages });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
