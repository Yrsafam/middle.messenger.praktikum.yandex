import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  href: string;
  title: string;
  className?: string;
  onClick?(): void;
  events?: BlockEvents;
}

export class ButtonText extends Block<Props> {
  static componentName = "ButtonText";

  constructor({ href, title, className = "", onClick = () => {} }: Props) {
    super({
      href,
      title,
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
