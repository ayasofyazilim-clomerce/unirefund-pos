import type { Volo_Abp_Account_ProfileDto } from '@ayasofyazilim/core-saas/AccountService';
import type { GrantedPolicies } from '~/actions/AccountService/types';
import type { Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto } from '@ayasofyazilim/core-saas/AccountService';

export type Store = {
  tenant: Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null;
  setTenant: (tenant: Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null) => void;

  profile: Volo_Abp_Account_ProfileDto | undefined;
  setProfile: (data: Volo_Abp_Account_ProfileDto | undefined) => void;
  grantedPolicies: GrantedPolicies | undefined;
  setGrantedPolicies: (data: GrantedPolicies | undefined) => void;
};
