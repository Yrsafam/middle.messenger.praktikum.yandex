import { Block, BlockEvents } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  onClick(event: Event): void;
  disabled?: boolean;
  events?: BlockEvents;
}

export class ButtonSubmit extends Block<Props> {
  static componentName = "ButtonSubmit";

  constructor({ onClick, disabled = false }: Props) {
    super({
      onClick,
      disabled,
      events: {
        click: onClick,
      },
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
