import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class NotFound extends Block {
  static componentName = "NotFound";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
