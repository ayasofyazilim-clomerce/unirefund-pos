import type policies from '~/data/policies.json';

export type Policies = keyof typeof policies;
export type GrantedPolicies = Record<Policies, boolean>;
