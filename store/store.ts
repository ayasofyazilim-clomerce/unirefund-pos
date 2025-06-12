import { createWithEqualityFn } from 'zustand/traditional';
import type { Store } from './types';

export const useStore = createWithEqualityFn<Store>()((set) => ({
  env: 'live',
  setEnv: (env) => set(() => ({ env })),

  accessToken: null,
  setAccessToken: (accessToken) => set(() => ({ accessToken })),

  tenant: null,
  setTenant: (tenant) => set(() => ({ tenant })),

  profile: undefined,
  setProfile: (data) => set(() => ({ profile: data })),

  grantedPolicies: undefined,
  setGrantedPolicies: (data) => set(() => ({ grantedPolicies: data })),

  merchantList: null,
  setMerchantList: (merchantList) => set(() => ({ merchantList })),

  activeMerchant: null,
  setActiveMerchant: (merchant) => set(() => ({ activeMerchant: merchant })),
}));
