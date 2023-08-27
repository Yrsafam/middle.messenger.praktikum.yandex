import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class AvatarProfile extends Block {
  static componentName = "AvatarProfile";

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
