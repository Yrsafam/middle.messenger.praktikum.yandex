import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  type: "button" | "submit";
  title: string;
  className?: string;
  onClick?(event: Event): void;
  events?: BlockEvents;
}

export class Button extends Block<Props> {
  static componentName = "Button";

  constructor({
    title,
    type = "button",
    className = "",
    onClick = () => {},
  }: Props) {
    super({
      type,
      title,
      className,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
