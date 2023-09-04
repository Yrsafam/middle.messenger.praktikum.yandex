import { set } from "./set.ts";
import { EventBus } from "./EventBus.ts";
import { Block, BlockProps } from "./Block.ts";

export enum StoreEvents {
  Updated = "updated",
}

export interface StoreState {}

const INITIAL_STATE: StoreState = {};

export class Store extends EventBus {
  state: StoreState = INITIAL_STATE;

  public set(path: string, newState: unknown) {
    set(this.state, path, newState);

    this.on(StoreEvents.Updated, this.getState);
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();

export type MapStateToProps = <SP>(state: StoreState) => SP;

export function withStore<SP extends BlockProps>(
  mapStateToProps: MapStateToProps,
) {
  return function wrapper<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps<SP>(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps<SP>(store.getState());

          previousState = stateProps;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
