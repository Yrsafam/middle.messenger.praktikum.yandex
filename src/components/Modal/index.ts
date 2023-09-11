import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  title: string;
  buttonTitle: string;
  onChange(event: Event): void;
  value: string;
  onClick(): void;
  label: string;
  onClose(): void;
  visible?: boolean;
  events?: BlockEvents;
}

export class Modal extends Block<Props> {
  static componentName = "Modal";

  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event) => this.onClose(event),
      },
    });
  }

  private onClose(event: Event) {
    if (event.target === this.refs.overlay.element) {
      this.props.onClose();
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
