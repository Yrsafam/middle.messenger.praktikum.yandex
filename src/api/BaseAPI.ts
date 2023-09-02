import { HTTPTransport } from "../utils/HTTPTransport.ts";

type BaseAPIIdentifier = string | number;

export abstract class BaseAPI {
  protected httpClient: HTTPTransport;

  constructor(endpoint: string) {
    this.httpClient = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: BaseAPIIdentifier): Promise<unknown>;

  public abstract update?(
    data: unknown,
    identifier?: BaseAPIIdentifier,
  ): Promise<unknown>;

  public abstract delete?(identifier?: BaseAPIIdentifier): Promise<unknown>;
}
