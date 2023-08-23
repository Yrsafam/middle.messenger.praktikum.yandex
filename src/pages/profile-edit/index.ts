import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class ProfileEdit extends Block {
  static componentName = "ProfileEdit";

  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
