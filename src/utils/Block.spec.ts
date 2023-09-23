import { describe } from "mocha";
import { fake } from "sinon";
import esmock from "esmock";
import { expect } from "chai";
import { Block } from "./Block.ts";

const EventBusMock = {
  on: fake(),
  emit: fake(),
};

const { Block: BlockProxy } = (await esmock("./Block", {
  "./EventBus": {
    EventBus: class {
      on = EventBusMock.on;

      emit = EventBusMock.emit;
    },
  },
})) as { Block: typeof Block };

describe("Block", async () => {
  class ComponentMock extends BlockProxy {}

  it("should emit event on init method", () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});
    // eslint-disable-next-line no-unused-expressions
    expect(EventBusMock.emit.calledWith("init")).to.be.true;
  });

  it("should have correct props", () => {
    const component = new ComponentMock({ prop: "1", className: "block" });

    expect(component.props).to.deep.equal({ prop: "1", className: "block" });
  });

  it("should have correct props after update", () => {
    const component = new ComponentMock({
      className: "default",
    });

    component.setProps({ className: "customClass" });

    expect(component.props).to.deep.equal({ className: "customClass" });
  });
});
