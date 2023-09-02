import { Block } from "./Block.ts";

export enum Routes {
  Main = "/", // авторизация
  Messenger = "/messenger",
  Registration = "/sign-up",
  Settings = "/settings",
  Profile = "/profile",
  ProfileEdit = "/profileEdit",
  ChangePassword = "/change-password",
  NotFound = "/404",
  ServerError = "/500",
}

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);
  const blockContent = block.getContent();
  console.log(root, blockContent);
  if (root && blockContent) {
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }

  return root;
}
