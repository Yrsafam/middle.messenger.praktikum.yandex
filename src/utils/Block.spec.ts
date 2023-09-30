import { describe } from "mocha";
import { fake } from "sinon";
import esmock from "esmock";
import { expect } from "chai";
import { Block } from "./Block.ts";

const EventBusMock = {
  on: fake(),
  emit: fake(),
};

const { Block: BlockProxy } = (await esmock("./Block.ts", {
  "./EventBus.ts": {
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
    expect(EventBusMock.emit.calledWith(Block.EVENTS.INIT)).to.be.true;
  });

  it("should emit event on setProps method", () => {
    const component = new ComponentMock({ testProps: "test" });

    component.setProps({ testProps: "customTest" });

    // eslint-disable-next-line no-unused-expressions
    expect(EventBusMock.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
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

  it("should render html", () => {
    class Component extends Block {
      public override render() {
        return this.compile(() => "<div>Test</div>", this.props);
      }
    }
    const component = new Component({ className: "class" });

    component.render();

    expect(component.getContent()?.outerHTML).to.equal("<div>Test</div>");
  });

  it("should render correct text", () => {
    class Component extends Block {
      public override render() {
        return this.compile(() => "<div>Test text</div>", this.props);
      }
    }
    const component = new Component({});

    component.render();

    expect(component.getContent()?.textContent).to.equal("Test text");
  });
});
