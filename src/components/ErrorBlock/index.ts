import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  title: string;
  description: string;
}

export class ErrorBlock extends Block<Props> {
  static componentName = "ErrorBlock";

  protected render() {
    return this.compile(template, this.props);
  }
}
