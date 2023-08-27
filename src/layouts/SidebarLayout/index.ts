import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class SidebarLayout extends Block {
  static componentName = "SidebarLayout";

  protected render() {
    return this.compile(template, this.props);
  }
}
