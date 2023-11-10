import { createStore, createLogger } from "vuex";
import { authModule } from "./modules/auth/index";
import { Store } from "./types";
import { RootState } from "./types";
import VuexPersist from "vuex-persist";

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

/** @description Create a new vuex-persist instance.*/
const vuexLocalStorage = new VuexPersist({
  strictMode: debug,
  key: "test", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});
plugins.push(vuexLocalStorage.plugin);

/** @description Create a new store instance.*/
export const store = createStore<RootState>({
  strict: debug,
  plugins,
  modules: {
    authModule,
  },
});

/** @description Hook to provide typings for `store` and `useStore` */
export function useStore(): Store {
  return store as Store;
}
