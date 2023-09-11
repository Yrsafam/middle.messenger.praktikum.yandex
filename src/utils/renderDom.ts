import { Block } from "./Block.ts";

export enum Routes {
  Main = "/", // авторизация
  Messenger = "/messenger",
  Registration = "/sign-up",
  Settings = "/settings",
  ProfileEdit = "/profile-edit",
  ChangePassword = "/change-password",
  NotFound = "/404",
  ServerError = "/500",
}

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);
  const blockContent = block.getContent();

  if (root && blockContent) {
    root.innerHTML = "";
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }

  return root;
}
