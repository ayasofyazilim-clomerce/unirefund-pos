import type { Volo_Abp_Account_ProfileDto } from '@ayasofyazilim/core-saas/AccountService';
import type { GrantedPolicies } from '~/actions/AccountService/types';
import type { Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto } from '@ayasofyazilim/core-saas/AccountService';
import { ParseResult } from 'mrz';

export type Store = {
  env: 'dev' | 'live';
  setEnv: (env: 'dev' | 'live') => void;

  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;

  tenant: Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null;
  setTenant: (tenant: Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null) => void;

  profile: Volo_Abp_Account_ProfileDto | undefined;
  setProfile: (data: Volo_Abp_Account_ProfileDto | undefined) => void;
  grantedPolicies: GrantedPolicies | undefined;
  setGrantedPolicies: (data: GrantedPolicies | undefined) => void;
};

export type RegistrationStore = {
  scannedDocument: (ParseResult & { fields: { firstName: string; lastName: string } }) | undefined;
  setScannedDocument: (
    data: (ParseResult & { fields: { firstName: string; lastName: string } }) | undefined
  ) => void;
};
