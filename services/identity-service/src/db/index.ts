export { auditColumns, idColumn } from "@/db/columns";
export {
  type Identity,
  type Profile,
  type ProfilePhotoUploadRequest,
  type NewIdentity,
  type NewProfile,
  type NewProfilePhotoUploadRequest,
  Identities,
  IdentitiesRelations,
  Profiles,
  ProfilesRelations,
  ProfilePhotoUploadRequests,
  ProfilePhotoUploadRequestsRelations,
} from "@/db/tables";
export type { Database, DbClient, Transaction } from "@/db/types";
