import { v4 as uuidv4 } from "uuid";
import { EventBus, IEventBus } from "./EventBus.ts";
import { ComponentChildren } from "./registerComponent.ts";

export type BlockEvents = Record<string, (event: Event) => void>;
export type BlockProps = object;
// eslint-disable-next-line no-use-before-define
export type BlockRefs = Record<string, Block>;

export abstract class Block<Props extends BlockProps = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;

  public props: Props;

  // eslint-disable-next-line no-use-before-define
  private children: Record<string, Block> = {};

  // eslint-disable-next-line no-use-before-define
  protected refs: BlockRefs = {};

  public id = uuidv4();

  private eventBus: () => IEventBus;

  constructor(props: Props) {
    const eventBus = new EventBus();

    this.props = this.makePropsProxy(props as Record<string, unknown>);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps !== undefined && newProps !== undefined;
  }

  public setProps = (nextProps?: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    const block = this.render();
    const blockFirstElementChild = block?.firstElementChild;
    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(blockFirstElementChild!);
    }
    this._element = blockFirstElementChild as HTMLElement;
    this._addEvents();
  }

  protected render(): DocumentFragment | null {
    return null;
  }

  protected compile(
    template: (context: unknown) => string,
    context: Props & { __children?: ComponentChildren[] },
  ) {
    const propsAndStubs: BlockProps & {
      __children?: ComponentChildren[];
      __refs: BlockRefs;
    } = {
      ...context,
      __refs: this.refs,
    };

    const html = template(propsAndStubs);

    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;
    fragment.innerHTML = html;

    propsAndStubs?.__children?.forEach((child: ComponentChildren) => {
      child.embed(fragment.content);
    });

    if (propsAndStubs?.__refs) {
      this.refs = propsAndStubs?.__refs;
    }

    return fragment.content;
  }

  public getContent() {
    return this.element;
  }

  protected makePropsProxy(props: Record<string, unknown>): Props {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    }) as Props;
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private _addEvents() {
    const { events = {} }: { events: Record<string, () => void> | undefined } =
      this.props as any;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents() {
    const { events = {} }: { events: Record<string, () => void> | undefined } =
      this.props as any;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  public show() {
    const content = this.getContent();

    if (content !== null) {
      content.style.display = "block";
    }
  }

  public hide() {
    const content = this.getContent();

    if (content !== null) {
      content.style.display = "none";
    }
  }
}
