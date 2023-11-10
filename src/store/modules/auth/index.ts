import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import {
  Action,
  Mutation,
  AuthState,
  AuthGetters,
  AuthMutations,
  AuthActions,
  AugmentedActionContext,
} from "./types";
import { RootState } from "../../types";
import { UserModel } from "@/interfaces/models/UserModel";

/** State **/
const state: AuthState = {
  isAuthenticated: false,
  user: {},
};

/** Getters **/
const getters: GetterTree<AuthState, RootState> & AuthGetters = {
  /** @description Check user authentication */
  isAuthenticated: (state: AuthState) => {
    return state.isAuthenticated;
  },
  /** @description Get user authentication */
  user: (state: AuthState) => state.user,
};

/** Actions **/
const actions: ActionTree<AuthState, RootState> & AuthActions = {
  /** @description Get user authentication */
  [Action.GET_AUTH]({ commit }: AugmentedActionContext): void {
    const user: UserModel = {
      user_id: 1,
      name: "Nguyen Trung Truc",
      email: "trucb1203981@gmail.com",
    };
    commit(Mutation.SET_AUTH, user);
  },
  /** @description Logout user */
  [Action.LOGOUT]({ commit }: AugmentedActionContext): void {
    commit(Mutation.CLEAR_AUTH);
  }
};

/** Mutations **/
const mutations: MutationTree<AuthState> & AuthMutations = {
  /** @description Set user authentication */
  [Mutation.SET_AUTH](state: AuthState, user: UserModel): void {
    state.isAuthenticated = true;
    state.user = user;
  },
  /** @description Clear user authentication */
  [Mutation.CLEAR_AUTH](state: AuthState): void {
    state.isAuthenticated = false;
    state.user = {};
  },
};

export const authModule: Module<AuthState, RootState> = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
