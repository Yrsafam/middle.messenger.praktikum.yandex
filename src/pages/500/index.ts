import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class ServerError extends Block {
  static componentName = "ServerError";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
