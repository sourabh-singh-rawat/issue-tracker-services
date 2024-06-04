export interface WorkspaceRegistrationDataInputs {
  name: string;
  id?: string;
  description?: string;
}

export class WorkspaceRegistrationData {
  name;
  id?;
  description?;

  constructor({ name, id, description }: WorkspaceRegistrationDataInputs) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
