import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { authController } from "../../controllers/AuthController.ts";

export class Profile extends Block {
  constructor() {
    super({
      onLogout: () => this.onLogout(),
    });
  }

  public onLogout() {
    authController.logout();
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
