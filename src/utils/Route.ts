import { Block } from "./Block.ts";
import { renderDom } from "./renderDom.ts";

export interface BlockConstructable<P extends object = any> {
  new (props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

export class Route {
  private block: Block | null = null;

  private pathname: string;

  private readonly blockClass: BlockConstructable;

  private readonly query: string;

  constructor(pathname: string, blockClass: BlockConstructable, query: string) {
    this.pathname = pathname;
    this.blockClass = blockClass;
    this.query = query;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      // eslint-disable-next-line new-cap
      this.block = new this.blockClass({});

      renderDom(this.query, this.block);
    }
  }
}
