import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  className?: string;
}

export class ForwardRef extends Block<Props> {
  static componentName = "ForwardRef";

  constructor({ className = "" }: Props) {
    super({ className });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
