// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";
import Handlebars from "handlebars";
import { EventBus, IEventBus } from "./EventBus.ts";

export type BlockProps = Record<string, unknown>;

export abstract class Block<Props extends BlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;

  private readonly meta: {
    tagName: string;
    props: Props;
  };

  protected props: Props;

  // eslint-disable-next-line no-use-before-define
  private children: Block<BlockProps>;

  protected id = uuidv4();

  private eventBus: () => IEventBus;

  protected constructor(propsAndChildren: Props, tagName = "div") {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(
      propsAndChildren,
    ) as unknown as {
      children: Block<BlockProps>;
      props: Props;
    };

    this.children = children;
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this.createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _getChildren(propsAndChildren: Props) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps !== undefined && newProps !== undefined) {
      const newValues = Object.values(newProps);
      return Array.prototype.some.call(
        oldProps,
        (x, index) => x !== newValues[index],
      );
    }

    return false;
  }

  setProps = (nextProps?: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    const block = this.render();

    if (block && this._element) {
      this._element.innerHTML = "";
      this._element.append(block);
    }
  }

  render(): DocumentFragment | null {
    return null;
  }

  compile(template: string, props: Props) {
    const propsAndStubs: BlockProps = { ...props };

    Object.entries(this.children).forEach(([key, value]) => {
      propsAndStubs[key] = `<div data-id="${value.id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      const childContent = child.getContent();

      if (stub && childContent) {
        stub.replaceWith(childContent);
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: BlockProps, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();

    if (content !== null) {
      content.style.display = "block";
    }
  }

  hide() {
    const content = this.getContent();

    if (content !== null) {
      content.style.display = "none";
    }
  }
}
