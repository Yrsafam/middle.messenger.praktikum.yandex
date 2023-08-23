import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class AvatarProfile extends Block {
  static componentName = "AvatarProfile";

  constructor() {
    super({});
  }

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
