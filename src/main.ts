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

registerComponent(Button);
registerComponent(ContextMenu);
registerComponent(HandleChat);
registerComponent(Message);
registerComponent(Messages);
registerComponent(CardChat);
registerComponent(Sidebar);
registerComponent(ButtonText);
registerComponent(SidebarLayout);
registerComponent(Main);

document.addEventListener("DOMContentLoaded", () => {
  renderDom(new Main());
});
