import { afterEach, beforeEach } from "mocha";
import {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
  useFakeXMLHttpRequest,
} from "sinon";
import { HTTPTransport } from "./HTTPTransport.ts";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request) => {
      requests.push(request);
    };

    http = new HTTPTransport("/auth");
  });

  afterEach(() => {
    xhr.restore();
  });
});
