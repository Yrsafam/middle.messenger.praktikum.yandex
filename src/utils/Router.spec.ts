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

  it("should called method .back", () => {
    router.use("/", BlockMock).start();

    router.back();

    expect(getContentFake.callCount).to.equal(1);
  });

  it("should called method .forward", () => {
    router.use("/", BlockMock).start();

    router.forward();

    expect(getContentFake.callCount).to.equal(1);
  });

  it("should called method .go", () => {
    router.use("/sign-in", BlockMock).start();

    router.go("/sign-in");

    expect(getContentFake.callCount).to.equal(2);
  });
});
