import { Block, BlockEvents } from "../../utils/Block.ts";
import router from "../../utils/Router.ts";
import template from "./template.hbs";

interface Props {
  href: string;
  className?: string;
  events?: BlockEvents;
  router?: typeof router;
}

export class Link extends Block<Props> {
  static componentName = "Link";

  constructor(props: Props) {
    super({
      ...props,
      router,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  public navigate() {
    this.props.router?.go(this.props.href);
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
