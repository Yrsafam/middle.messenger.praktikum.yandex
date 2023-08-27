import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  disabled?: boolean;
}

export class ButtonSubmit extends Block<Props> {
  static componentName = "ButtonSubmit";

  constructor({ disabled = false }: Props) {
    super({ disabled });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
