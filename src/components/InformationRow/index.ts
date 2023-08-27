import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

interface Props {
  name: string;
  value: string;
}

export class InformationRow extends Block<Props> {
  static componentName = "InformationRow";

  protected render() {
    return this.compile(template, this.props);
  }
}
