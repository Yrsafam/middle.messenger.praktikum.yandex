import Handlebars, { HelperOptions } from "handlebars";

import { Block, BlockProps } from "./Block.ts";

type ConstructableComponent<Props extends BlockProps = any> = {
  new (props: Props): Block<Props>;
  componentName: string;
};

export function registerComponent(Component: ConstructableComponent) {
  Handlebars.registerHelper(
    Component.componentName,
    // eslint-disable-next-line prefer-arrow-callback
    function fnDelegate(this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);
      const dataAttribute = `data-component-hbs-id="${component.id}"`;

      (data.root__children || data.root.__children || []).push({
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
