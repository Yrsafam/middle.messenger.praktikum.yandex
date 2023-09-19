import { afterEach, beforeEach } from "mocha";
import {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
  useFakeXMLHttpRequest,
} from "sinon";
import { expect } from "chai";
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

  it("should have correct url", () => {
    http.get("/user");

    const [request] = requests;

    expect(request.url).to.equal(`${HTTPTransport.BASE_URL}/auth/user`);
  });

  it("should have correct method", () => {
    http.get("/user");

    const [request] = requests;

    expect(request.method).to.equal("GET");
  });
});
