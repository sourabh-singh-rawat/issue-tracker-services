import { Filters } from ".";

export interface IssueListFilters extends Filters {
  projectId?: string;
  priority?: string;
}
