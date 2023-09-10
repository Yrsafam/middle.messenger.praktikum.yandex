import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  className?: string;
  onClick(event: Event): void;
  events?: BlockEvents;
}

export class ForwardRef extends Block<Props> {
  static componentName = "ForwardRef";

  constructor({ className = "", onClick }: Props) {
    super({
      onClick,
      className,
      events: {
        click: onClick,
      },
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
