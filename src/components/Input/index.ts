import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  name: string;
  label: string;
  value?: string;
  onChange?(event: Event): void;
  onBlur?(event: Event): void;
  type?: string;
  className?: string;
  errorText?: string;
  events?: BlockEvents;
}

export class Input extends Block<Props> {
  static componentName = "Input";

  constructor({
    name,
    label,
    errorText,
    type = "text",
    className = "",
    value = "",
    onChange = () => {},
    onBlur = () => {},
  }: Props) {
    super({
      name,
      label,
      errorText,
      type,
      className,
      value,
      events: {
        change: onChange,
        focusout: onBlur,
      },
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
