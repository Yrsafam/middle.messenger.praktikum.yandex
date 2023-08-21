import { Block } from "../../../utils/Block.ts";
import template from "./template.ts";

interface Props {}

export class Main extends Block<Props> {
  static componentName = "Main";

  render() {
    return this.compile(template, this.props);
  }
}
