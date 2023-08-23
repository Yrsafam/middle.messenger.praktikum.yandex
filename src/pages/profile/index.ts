import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";

export class Profile extends Block {
  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
