import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  href: string;
  title: string;
  className?: string;
}

export class ButtonText extends Block<Props> {
  static componentName = "ButtonText";

  constructor({ href, title, className = "" }: Props) {
    super({ href, title, className });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
