import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  title: string;
  buttonTitle: string;
  onChange(event: Event): void;
  value: string;
  onClick(): void;
  label: string;
}

export class Modal extends Block<Props> {
  static componentName = "ModalAdd";

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
