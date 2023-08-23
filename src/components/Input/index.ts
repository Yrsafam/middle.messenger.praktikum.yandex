import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  name: string;
  label: string;
  type?: string;
  className?: string;
  errorText?: string;
}

export class Input extends Block<Props> {
  static componentName = "Input";

  constructor({
    name,
    label,
    errorText,
    type = "text",
    className = "",
  }: Props) {
    super({ name, label, errorText, type, className });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
