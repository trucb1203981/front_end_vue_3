import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex";
import { RootState } from "../../types";
import { UserModel } from "@/interfaces/models/UserModel";

export enum Mutation {
  SET_AUTH = "SET_AUTH",
  CLEAR_AUTH = "CLEAR_AUTH",
}

export enum Action {
  GET_AUTH = "GET_AUTH",
  LOGOUT = "LOGOUT",
}

/** State **/
export type AuthState = {
  isAuthenticated: boolean;
  user: UserModel | object;
};

/** Getters **/
export type AuthGetters = {
  isAuthenticated(state: AuthState): boolean;
  user(state: AuthState): UserModel | object;
};

/** Mutations **/
export type AuthMutations<S = AuthState> = {
  [Mutation.SET_AUTH](state: S, user: UserModel): void;
  [Mutation.CLEAR_AUTH](state: S): void;
};

/** Actions **/
export type AuthActions = {
  [Action.GET_AUTH]({ commit }: AugmentedActionContext): void;
  [Action.LOGOUT]({ commit }: AugmentedActionContext): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof AuthMutations>(
    key: K,
    payload?: Parameters<AuthMutations[K]>[1]
  ): ReturnType<AuthMutations[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

export type AuthStoreModuleTypes<S = AuthState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof AuthMutations,
    P extends Parameters<AuthMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<AuthMutations[K]>;
} & {
  getters: {
    [K in keyof AuthGetters]: ReturnType<AuthGetters[K]>;
  };
} & {
  dispatch<K extends keyof AuthActions>(
    key: K,
    payload?: Parameters<AuthActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AuthActions[K]>;
};
