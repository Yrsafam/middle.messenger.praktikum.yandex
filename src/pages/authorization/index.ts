import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class Authorization extends Block {
  static componentName = "Authorization";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
