import type {
  Volo_Abp_Account_ProfileDto,
  Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto,
} from '@ayasofyazilim/core-saas/AccountService';
import type { UniRefund_CRMService_Merchants_MerchantProfileDto } from '@ayasofyazilim/saas/CRMService';
import type { GrantedPolicies } from '~/actions/AccountService/types';

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

  merchantList: UniRefund_CRMService_Merchants_MerchantProfileDto[] | null;
  setMerchantList: (data: UniRefund_CRMService_Merchants_MerchantProfileDto[] | null) => void;

  activeMerchant: UniRefund_CRMService_Merchants_MerchantProfileDto | null;
  setActiveMerchant: (data: UniRefund_CRMService_Merchants_MerchantProfileDto | null) => void;
};
