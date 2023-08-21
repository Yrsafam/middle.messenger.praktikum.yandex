import { registerComponent } from "./utils/registerComponent.ts";
import { renderDom } from "./utils/renderDom.ts";
import { Button } from "./components/Button";
import { Main } from "./pages/main/Main";
import { Sidebar } from "./pages/main/Sidebar";
import { CardChat } from "./pages/main/CardChat";

registerComponent(Button);
registerComponent(CardChat);
registerComponent(Sidebar);
registerComponent(Main);

document.addEventListener("DOMContentLoaded", () => {
  renderDom(new Main({ someProp: "test" }));
});
