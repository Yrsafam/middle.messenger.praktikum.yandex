import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  avatar?: string;
  onChange?(event: Event): void;
  events?: BlockEvents;
}

export class AvatarProfile extends Block {
  static componentName = "AvatarProfile";

  constructor({ avatar = "", onChange = () => {} }: Props) {
    super({
      avatar,
      events: {
        change: onChange,
      },
    });
  }

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
