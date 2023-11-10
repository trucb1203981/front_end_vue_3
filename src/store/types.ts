import { AuthStoreModuleTypes, AuthState } from "./modules/auth/types";

export type RootState = {
  auth: AuthState;
};

// Define your own store type
export type Store = AuthStoreModuleTypes<Pick<RootState, "auth">>;
//  & ProfileStore<Pick<RootState, 'profile'>>;
