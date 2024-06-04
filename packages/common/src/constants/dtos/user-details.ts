export interface UserDetailsInput {
  userId: string;
  email: string;
  displayName?: string;
  isEmailVerified: boolean;
  defaultWorkspaceId: string;
  createdAt: Date;
  defaultWorkspaceName?: string;
  photoUrl?: string;
  description?: string;
}

export class UserDetails {
  public userId: string;
  public email: string;
  public displayName?: string;
  public isEmailVerified: boolean;
  public defaultWorkspaceId: string;
  public createdAt: Date;
  public defaultWorkspaceName?: string;
  public photoUrl?: string;
  public description?: string;
  constructor(inputs: UserDetailsInput) {
    this.userId = inputs.userId;
    this.email = inputs.email;
    this.displayName = inputs.displayName;
    this.isEmailVerified = inputs.isEmailVerified;
    this.createdAt = inputs.createdAt;
    this.photoUrl = inputs.photoUrl;
    this.description = inputs.description;
    this.defaultWorkspaceId = inputs.defaultWorkspaceId;
    this.defaultWorkspaceName = inputs.defaultWorkspaceName;
  }
}
