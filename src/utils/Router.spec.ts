import { describe } from "mocha";
import { fake } from "sinon";
import { expect } from "chai";
import router from "./Router.ts";
import { BlockConstructable } from "./Route.ts";

describe("Router", () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    router.reset();
  });

  const getContentFake = fake.returns(document.createElement("div"));

  const BlockMock: BlockConstructable = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it("should return correct instance from method use", () => {
    const instance = router.use("/", BlockMock);

    expect(instance).to.equal(router);
  });
});
