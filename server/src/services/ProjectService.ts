import ServiceResponse from '../utils/ServiceResponse.js';
import IProjectService from './interfaces/IProjectService.js';

class ProjectService implements IProjectService {
  public async createProject(uid: string, project: object) {
    const serviceResponse = new ServiceResponse();
  }

  public async getAllProjects(uid: string) {
    const serviceResponse = new ServiceResponse();
  }

  public async getProjectById(uid: string) {
    const serviceResponse = new ServiceResponse();
  }

  public async getAllMembers(uid: string) {
    const serviceResponse = new ServiceResponse();
  }

  public async getAllIssuesCount(uid: string) {
    const serviceResponse = new ServiceResponse();
  }
}

export default new ProjectService();
