import { ProjectStatus } from "../enums/project-status";

export class ProjectFormData {
  constructor(
    public name: string,
    public description: string,
    public status: ProjectStatus,
    public startDate: Date,
    public endDate: Date,
  ) {}
}
