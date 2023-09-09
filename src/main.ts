import { registerComponent } from "./utils/registerComponent.ts";
import { Routes } from "./utils/renderDom.ts";
import Router from "./utils/Router.ts";

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
import { Authorization } from "./pages/authorization";
import { Registration } from "./pages/registration";
import { ChangePassword } from "./pages/change-password";
import { Profile } from "./pages/profile";
import { ProfileEdit } from "./pages/profile-edit";
import { NotFound } from "./pages/404";
import { ServerError } from "./pages/500";
import { authController } from "./controllers/AuthController.ts";
import { Modal } from "./components/Modal";

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
registerComponent(Modal);

document.addEventListener("DOMContentLoaded", async () => {
  const { pathname } = window.location;

  Router.use(Routes.Main, Authorization)
    .use(Routes.Registration, Registration)
    .use(Routes.ChangePassword, ChangePassword)
    .use(Routes.Settings, Profile)
    .use(Routes.ProfileEdit, ProfileEdit)
    .use(Routes.NotFound, NotFound)
    .use(Routes.ServerError, ServerError)
    .use(Routes.Messenger, Main);

  let isProtectedRoute;
  const isNotFoundRoute = !Object.values(Routes).includes(pathname as Routes);

  switch (pathname) {
    case Routes.Main:
    case Routes.Registration:
    case Routes.NotFound:
    case Routes.ServerError:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
      break;
  }

  if (isNotFoundRoute) {
    Router.go(Routes.NotFound);
  }

  Router.start();

  try {
    await authController.checkSignin();

    if (!isProtectedRoute) {
      Router.go(Routes.Settings);
    }
  } catch (e) {
    if (isProtectedRoute) {
      Router.go(Routes.Main);
    }
  }
});
