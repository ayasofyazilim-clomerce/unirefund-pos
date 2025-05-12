import { createWithEqualityFn } from 'zustand/traditional';
import type { Volo_Abp_Account_ProfileDto } from '@ayasofyazilim/core-saas/AccountService';
import type { GrantedPolicies } from '~/actions/AccountService/types';

export type Store = {
  profile: Volo_Abp_Account_ProfileDto | undefined;
  setProfile: (data: Volo_Abp_Account_ProfileDto | undefined) => void;
  grantedPolicies: GrantedPolicies | undefined;
  setGrantedPolicies: (data: GrantedPolicies | undefined) => void;
};

export const useStore = createWithEqualityFn<Store>()((set) => ({
  profile: undefined,
  setProfile: (data) => set(() => ({ profile: data })),

  grantedPolicies: undefined,
  setGrantedPolicies: (data) => set(() => ({ grantedPolicies: data })),
}));
