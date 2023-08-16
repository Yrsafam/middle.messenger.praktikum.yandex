type EventBusCallback = (...args: Partial<Array<unknown>>) => void;
type EventBusListeners = Record<string, Array<EventBusCallback>>;
type EventBusEvent = string;

export interface IEventBus {
  on(event: EventBusEvent, callback: EventBusCallback): void;
  off(event: EventBusEvent, callback: EventBusCallback): void;
  emit(event: EventBusEvent, ...args: Array<unknown>): void;
}

export class EventBus implements IEventBus {
  private listeners: EventBusListeners;

  constructor() {
    this.listeners = {};
  }

  on(event: EventBusEvent, callback: EventBusCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: EventBusEvent, callback: EventBusCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: EventBusEvent, ...args: Array<unknown>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
