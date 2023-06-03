export default interface IProjectService {
  createProject(uid: string, project: object): Promise<void>;
  getAllProjects(uid: string): Promise<void>;
  getProjectById(uid: string): Promise<void>;
  getAllMembers(uid: string): Promise<void>;
  getAllIssuesCount(uid: string): Promise<void>;
}
