enum HTTPTransportMethods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}
const TIMEOUT = 5000;

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, unknown>) {
  const queriesString = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  return `?${queriesString}`;
}

type HTTPTransportOptions<D> = {
  data: D;
  method: HTTPTransportMethods;
  timeout?: number;
  headers?: Headers;
};

type HTTPTransportMethod = <D = unknown>(
  url: string,
  options?: Partial<HTTPTransportOptions<D>>,
) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  constructor() {
    this.request = this.request.bind(this);
  }

  get: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) => {
    let urlWithSearchParams = url;

    if (options.data) {
      urlWithSearchParams += queryStringify(options.data);
    }

    return this.request(urlWithSearchParams, {
      ...options,
      method: HTTPTransportMethods.Get,
    });
  };

  post: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(url, { ...options, method: HTTPTransportMethods.Post });

  put: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(url, { ...options, method: HTTPTransportMethods.Put });

  delete: HTTPTransportMethod = (url, options = { timeout: TIMEOUT }) =>
    this.request(url, { ...options, method: HTTPTransportMethods.Delete });

  request: HTTPTransportMethod = (
    url,
    options = {
      method: HTTPTransportMethods.Get,
      timeout: TIMEOUT,
    },
  ) =>
    new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        method = HTTPTransportMethods.Get,
        data,
        headers,
        timeout = TIMEOUT,
      } = options;

      xhr.open(method, url);

      if (headers !== undefined) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;

      xhr.onload = function onload() {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = reject;

      if (method === HTTPTransportMethods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
}
