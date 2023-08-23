import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class Registration extends Block {
  static componentName = "Registration";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
