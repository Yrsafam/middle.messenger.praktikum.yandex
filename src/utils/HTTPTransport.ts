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

export class HTTPTransport {
  constructor() {
    this.request = this.request.bind(this);
  }

  get<D>(
    url: string,
    options: Partial<HTTPTransportOptions<D>> = { timeout: TIMEOUT },
  ) {
    let urlWithSearchParams = url;

    if (options.data) {
      urlWithSearchParams += queryStringify(options.data);
    }

    return this.request(
      urlWithSearchParams,
      { ...options, method: HTTPTransportMethods.Get },
      options.timeout,
    );
  }

  post<D>(
    url: string,
    options: Partial<HTTPTransportOptions<D>> = { timeout: TIMEOUT },
  ) {
    return this.request(
      url,
      { ...options, method: HTTPTransportMethods.Post },
      options.timeout,
    );
  }

  put<D>(
    url: string,
    options: Partial<HTTPTransportOptions<D>> = { timeout: TIMEOUT },
  ) {
    return this.request(
      url,
      { ...options, method: HTTPTransportMethods.Put },
      options.timeout,
    );
  }

  delete<D>(
    url: string,
    options: Partial<HTTPTransportOptions<D>> = { timeout: TIMEOUT },
  ) {
    return this.request(
      url,
      { ...options, method: HTTPTransportMethods.Delete },
      options.timeout,
    );
  }

  request<D>(
    url: string,
    options: Partial<HTTPTransportOptions<D>> = {
      method: HTTPTransportMethods.Get,
    },
    timeout = TIMEOUT,
  ) {
    // Не понимаю почему eslint не видит xhr объект
    // eslint-disable-next-line no-undef
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const xhr = new XMLHttpRequest();
      const { method = HTTPTransportMethods.Get, data, headers } = options;

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
}
