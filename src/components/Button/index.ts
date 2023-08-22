import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  title: string;
  className?: string;
}

export class Button extends Block<Props> {
  static componentName = "Button";

  render() {
    return this.compile(template, this.props);
  }
}
