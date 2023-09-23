import { afterEach, beforeEach, describe } from "mocha";
import {
  fake,
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
  SinonSpy,
  spy,
  useFakeXMLHttpRequest,
} from "sinon";
import { expect } from "chai";
import esmock from "esmock";
import { HTTPTransport } from "./HTTPTransport.ts";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

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
    requests = [];
  });

  describe("GET Requests", () => {
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

    it("should have query parameters", () => {
      http.get("/user", {
        data: {
          a: "1",
          b: "2",
        },
      });

      const [request] = requests;

      expect(request.url).to.equal(
        `${HTTPTransport.BASE_URL}/auth/user?a=1&b=2`,
      );
    });

    it("should have correct status code", () => {
      http.get("/user");

      const [request] = requests;

      request.respond(200, {}, "");

      expect(request.status).to.equal(200);
    });

    it("should have correct headers", () => {
      http.get("/user", {
        headers: {
          Authorization: "Bearer token",
        },
      });

      const [request] = requests;

      expect(request.requestHeaders.Authorization).to.equal("Bearer token");
    });

    describe("GET Requests with mock queryStringify", () => {
      let httpWithMock: HTTPTransport;
      let queryStringifyMock: SinonSpy;

      beforeEach(async () => {
        queryStringifyMock = fake.returns("?filter=1&sort=desc");
        const { HTTPTransport: HTTPTransportMock } = (await esmock(
          "./HTTPTransport",
          {
            "./queryStringify": {
              queryStringify: queryStringifyMock,
            },
          },
        )) as { HTTPTransport: typeof HTTPTransport };
        httpWithMock = new HTTPTransportMock("/auth");
      });

      it("should called queryStringify", () => {
        httpWithMock.get("/user", {
          data: {
            filter: 1,
          },
        });

        // eslint-disable-next-line no-unused-expressions
        expect(queryStringifyMock.called).to.be.true;
      });

      it("should called with parameters", () => {
        httpWithMock.get("/user", {
          data: {
            filter: 1,
            sort: "desc",
          },
        });

        expect(queryStringifyMock()).to.equal("?filter=1&sort=desc");
      });
    });
  });

  describe("POST Requests", () => {
    it("should have correct url", () => {
      http.post("/signin");

      const [request] = requests;

      expect(request.url).to.equal(`${HTTPTransport.BASE_URL}/auth/signin`);
    });

    it("should called with correct parameters", () => {
      const httpPostFake = spy(http, "post");

      httpPostFake("/signin", {
        data: {
          a: "a",
          b: "b",
        },
      });

      // eslint-disable-next-line no-unused-expressions
      expect(
        httpPostFake.calledWith("/signin", {
          data: {
            a: "a",
            b: "b",
          },
        }),
      ).to.be.true;
    });

    it("should have correct method", () => {
      http.post("/signin");

      const [request] = requests;

      expect(request.method).to.equal("POST");
    });
  });
});
