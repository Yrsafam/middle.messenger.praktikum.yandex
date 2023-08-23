import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {}

export class ContextMenu extends Block<Props> {
  static componentName = "ContextMenu";

  render() {
    return this.compile(template, this.props);
  }
}