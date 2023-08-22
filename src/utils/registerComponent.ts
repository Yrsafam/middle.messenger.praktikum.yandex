import Handlebars, { HelperOptions } from "handlebars";

import { Block, BlockProps } from "./Block.ts";

type ConstructableComponent<Props extends BlockProps = any> = {
  new (props: Props): Block<Props>;
  componentName: string;
};

export type ComponentChildren = {
  component: Block;
  embed: (fragment: DocumentFragment) => void;
};

export function registerComponent(Component: ConstructableComponent) {
  Handlebars.registerHelper(
    Component.componentName,
    // eslint-disable-next-line prefer-arrow-callback
    function fnDelegate(this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);
      const dataAttribute = `data-id="${component.id}"`;
      // eslint-disable-next-line no-multi-assign,no-param-reassign
      const children = (data.root.__children = data.root.__children || []);

      children.push({
        component,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(`[${dataAttribute}]`);

          if (!placeholder) {
            throw new Error(
              `Can't find data-id for component ${Component.componentName}`,
            );
          }

          const { element } = component;

          if (element) {
            element.append(...Array.from(placeholder.childNodes));
            placeholder.replaceWith(element);
          }
        },
      });

      const contents = fn ? fn(this) : "";

      return `<div ${dataAttribute}>${contents}</div>`;
    },
  );
}
