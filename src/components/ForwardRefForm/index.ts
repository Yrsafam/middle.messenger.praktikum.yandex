import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  className?: string;
}

export class ForwardRefForm extends Block<Props> {
  static componentName = "ForwardRefForm";

  constructor({ className = "" }: Props) {
    super({ className });
  }

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
