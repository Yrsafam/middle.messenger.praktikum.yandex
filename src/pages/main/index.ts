import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class Main extends Block {
  static componentName = "Main";

  constructor() {
    super({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
