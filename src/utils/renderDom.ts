import { Block } from "./Block.ts";

export function renderDom(block: Block) {
  const root = document.querySelector(".app");
  const blockContent = block.getContent();

  if (root && blockContent) {
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }

  return root;
}
