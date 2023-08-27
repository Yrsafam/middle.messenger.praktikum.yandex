import { Main } from "../pages/main";
import { NotFound } from "../pages/404";
import { Authorization } from "../pages/authorization";
import { ProfileEdit } from "../pages/profile-edit";
import { Registration } from "../pages/registration";
import { ServerError } from "../pages/500";
import { ChangePassword } from "../pages/change-password";
import { Profile } from "../pages/profile";

const ROUTES = {
  main: Main,
  authorization: Authorization,
  registration: Registration,
  "not-found": NotFound,
  "server-error": ServerError,
  "change-password": ChangePassword,
  profile: Profile,
  "profile-edit": ProfileEdit,
};

export type RoutesKeys = keyof typeof ROUTES;

export function renderDom(route: RoutesKeys) {
  const root = document.querySelector(".root");
  const block = new ROUTES[route]({});
  const blockContent = block.getContent();

  if (root && blockContent) {
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }

  return root;
}
