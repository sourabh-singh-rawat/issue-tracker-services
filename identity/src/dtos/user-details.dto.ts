export class UserDetails {
  public id: string;
  public email: string;
  public displayName: string;
  public isEmailVerified: boolean;
  public createdAt: Date;
  public photoUrl?: string;
  public description?: string;
  public defaultWorkspaceId?: string;
  constructor(inputs: {
    id: string;
    email: string;
    displayName: string;
    isEmailVerified: boolean;
    createdAt: Date;
    photoUrl?: string;
    description?: string;
    defaultWorkspaceId?: string;
  }) {
    this.id = inputs.id;
    this.email = inputs.email;
    this.displayName = inputs.displayName;
    this.isEmailVerified = inputs.isEmailVerified;
    this.createdAt = inputs.createdAt;
    this.photoUrl = inputs.photoUrl;
    this.description = inputs.description;
    this.defaultWorkspaceId = inputs.defaultWorkspaceId;
  }
}
