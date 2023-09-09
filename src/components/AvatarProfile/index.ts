import { Block, BlockEvents } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  avatar?: string;
  onChange?(event: Event): void;
  events?: BlockEvents;
  canChange?: boolean;
}

export class AvatarProfile extends Block {
  static componentName = "AvatarProfile";

  constructor({ avatar = "", onChange = () => {}, canChange = true }: Props) {
    super({
      avatar,
      canChange,
      events: {
        change: onChange,
      },
    });
  }

  protected render(): DocumentFragment | null {
    return this.compile(template, this.props);
  }
}
