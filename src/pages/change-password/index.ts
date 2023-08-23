import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class ChangePassword extends Block {
  static componentName = "ChangePassword";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
