import { ProjectStatus } from "@issue-tracker/common";

export class ProjectFormData {
  constructor(
    public name: string,
    public description: string,
    public status: ProjectStatus,
    public startDate: Date,
    public endDate: Date,
  ) {}
}
