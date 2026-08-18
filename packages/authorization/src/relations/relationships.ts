import { IDENTITY, PROFILE } from "../identities";
import type { GraphRelationship } from "../types/GraphRelationship";
import {
  ADMIN,
  MEMBER,
  ORGANIZATION_TENANT,
  OWNER,
  PLATFORM_OBJECT_ID,
  PLATFORM_TENANT,
  PROFILE_IDENTITY,
  TENANT_PLATFORM,
} from "./names";

export const platformAdminRelationship = (identityId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: ADMIN,
  subject: { namespace: IDENTITY, id: identityId },
});

export const platformMemberRelationship = (identityId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: MEMBER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantOwnerRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: OWNER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantAdminRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: ADMIN,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantMemberRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: MEMBER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const organizationOwnerRelationship = (
  organizationId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "organization", id: organizationId },
  relation: OWNER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const platformTenantRelationship = (tenantId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: PLATFORM_TENANT,
  subject: { namespace: "tenant", id: tenantId },
});

export const tenantPlatformRelationship = (tenantId: string): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: TENANT_PLATFORM,
  subject: { namespace: "platform", id: PLATFORM_OBJECT_ID },
});

export const organizationTenantRelationship = (
  organizationId: string,
  tenantId: string,
): GraphRelationship => ({
  object: { namespace: "organization", id: organizationId },
  relation: ORGANIZATION_TENANT,
  subject: { namespace: "tenant", id: tenantId },
});

export const profileIdentityRelationship = (
  profileId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: PROFILE, id: profileId },
  relation: PROFILE_IDENTITY,
  subject: { namespace: IDENTITY, id: identityId },
});
