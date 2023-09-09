import { set } from "./set.ts";
import { EventBus } from "./EventBus.ts";
import { Block, BlockProps } from "./Block.ts";
import { AuthUser } from "../api/AuthAPI.ts";

export enum StoreEvents {
  Updated = "updated",
}

export interface StoreState {
  user: AuthUser;
}

const INITIAL_STATE: StoreState = {
  user: {
    avatar: "",
    phone: "",
    email: "",
    login: "",
    id: -1,
    second_name: "",
    first_name: "",
    display_name: "",
  },
};

export class Store extends EventBus {
  state: StoreState = INITIAL_STATE;

  public set(path: string, newState: unknown) {
    try {
      set(this.state, path, newState);

      this.emit(StoreEvents.Updated, this.getState);
    } catch (e) {
      /* На случай если подписки на событие не произошло */
    }
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();

export type MapStateToProps<SP> = (state: StoreState) => SP;

export function withStore<SP extends BlockProps>(
  mapStateToProps: MapStateToProps<SP>,
) {
  return function wrapper<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
