import { createWithEqualityFn } from 'zustand/traditional';
import type { Store } from './types';

export const useStore = createWithEqualityFn<Store>()((set) => ({
  tenant: null,
  setTenant: (tenant) => set(() => ({ tenant })),

  profile: undefined,
  setProfile: (data) => set(() => ({ profile: data })),

  grantedPolicies: undefined,
  setGrantedPolicies: (data) => set(() => ({ grantedPolicies: data })),
}));
