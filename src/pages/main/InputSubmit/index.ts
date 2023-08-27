import { Block, BlockEvents } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  value?: string;
  onChange?(event: Event): void;
  events?: BlockEvents;
}

export class InputSubmit extends Block<Props> {
  static componentName = "InputSubmit";

  constructor({ value = "", onChange = () => {} }: Props) {
    super({
      value,
      events: {
        change: onChange,
      },
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
