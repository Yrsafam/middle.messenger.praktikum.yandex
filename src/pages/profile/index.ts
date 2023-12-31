import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { authController } from "../../controllers/AuthController.ts";
import { withStore } from "../../utils/Store.ts";

import { User } from "../../shared-kernel/types.ts";

type StateUser = {
  user?: User;
};

interface Props extends StateUser {
  onLogout(): void;
}

class ProfileBlock extends Block<Props> {
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

const withUser = withStore<StateUser>((state) => ({
  user: { ...state.user },
  avatar: state.user.avatar,
}));

export const Profile = withUser(ProfileBlock);
