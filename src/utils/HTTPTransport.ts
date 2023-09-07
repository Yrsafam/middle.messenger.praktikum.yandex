import { queryStringify } from "./queryStringify.ts";

enum HTTPTransportMethods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}
const TIMEOUT = 5000;

type HTTPTransportOptions<D> = {
  data: D;
  method: HTTPTransportMethods;
  timeout?: number;
  headers?: Headers;
  withCredentials?: boolean;
};

type HTTPTransportMethod = <R, D = unknown>(
  url: string,
  options?: Partial<HTTPTransportOptions<D>>,
) => Promise<R>;

export class HTTPTransport {
  static BASE_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.request = this.request.bind(this);
    this.endpoint = `${HTTPTransport.BASE_URL}${endpoint}`;
  }

  get: HTTPTransportMethod = (url = "/", options = { timeout: TIMEOUT }) => {
    let urlWithSearchParams = this.endpoint + url;

    if (options.data) {
      urlWithSearchParams += queryStringify(options.data);
    }

    return this.request(urlWithSearchParams, {
      ...options,
      method: HTTPTransportMethods.Get,
    });
  };

  post: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(this.endpoint + url, {
      ...options,
      method: HTTPTransportMethods.Post,
    });

  put: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(this.endpoint + url, {
      ...options,
      method: HTTPTransportMethods.Put,
    });

  delete: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(this.endpoint + url, {
      ...options,
      method: HTTPTransportMethods.Delete,
    });

  request: HTTPTransportMethod = (
    url,
    options = {
      method: HTTPTransportMethods.Get,
      timeout: TIMEOUT,
    },
  ) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        method = HTTPTransportMethods.Get,
        data,
        headers,
        timeout = TIMEOUT,
        withCredentials = true,
      } = options;

      xhr.open(method, url);

      if (headers !== undefined) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = "json";

      xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.onabort = () => reject(new Error("abort"));
      xhr.ontimeout = () => reject(new Error("timeout"));
      xhr.onerror = () => reject(new Error("error"));

      if (method === HTTPTransportMethods.Get || !data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
}
