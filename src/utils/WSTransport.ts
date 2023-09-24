import { EventBus } from "./EventBus";

export enum WSTransportEvents {
  Connected = "connected",
  Error = "error",
  Message = "message",
  Close = "close",
}
const TIMEOUT_PING = 5000;

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number | NodeJS.Timeout = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, resolve);
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, TIMEOUT_PING);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && data.type === "pong") {
          return;
        }

        this.emit(WSTransportEvents.Message, data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`Ошибка JSON.parse: ${e}`);
      }
    });
  }
}
