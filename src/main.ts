import { registerComponent } from "./utils/registerComponent.ts";
import { renderDom } from "./utils/renderDom.ts";

import { Button } from "./components/Button";
import { Main } from "./pages/main";
import { Sidebar } from "./pages/main/Sidebar";
import { CardChat } from "./pages/main/CardChat";
import { ContextMenu } from "./pages/main/ContextMenu";
import { HandleChat } from "./pages/main/HandleChat";
import { Message } from "./pages/main/Message";
import { Messages } from "./pages/main/Messages";
import { SidebarLayout } from "./layouts/SidebarLayout";
import { ButtonText } from "./components/ButtonText";
import { ErrorBlock } from "./components/ErrorBlock";
import { AvatarProfile } from "./components/AvatarProfile";
import { InformationRow } from "./components/InformationRow";
import { Input } from "./components/Input";
import { ForwardRefForm } from "./components/ForwardRefForm";
import { ButtonSubmit } from "./pages/main/ButtonSubmit";
import { InputSubmit } from "./pages/main/InputSubmit";

registerComponent(Button);
registerComponent(ContextMenu);
registerComponent(ForwardRefForm);
registerComponent(ButtonSubmit);
registerComponent(InputSubmit);
registerComponent(HandleChat);
registerComponent(Message);
registerComponent(Messages);
registerComponent(CardChat);
registerComponent(Sidebar);
registerComponent(ButtonText);
registerComponent(ErrorBlock);
registerComponent(AvatarProfile);
registerComponent(InformationRow);
registerComponent(Input);
registerComponent(SidebarLayout);
registerComponent(Main);

document.addEventListener("DOMContentLoaded", () => {
  const { pathname } = window.location;

  switch (pathname) {
    case "/":
      renderDom("main");
      break;
    case "/registration":
      renderDom("registration");
      break;
    case "/authorization":
      renderDom("authorization");
      break;
    case "/profile":
      renderDom("profile");
      break;
    case "/profile-edit":
      renderDom("profile-edit");
      break;
    case "/change-password":
      renderDom("change-password");
      break;
    case "/500":
      renderDom("server-error");
      break;
    default:
      renderDom("not-found");
      break;
  }
});
