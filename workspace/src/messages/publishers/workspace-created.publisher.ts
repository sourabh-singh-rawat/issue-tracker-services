import { Publisher, Subjects } from "@sourabhrawatcc/core-utils";

export class WorkspaceCreatedPublisher extends Publisher<{
  payload: {
    id: string;
    name: string;
  };
  subject: Subjects;
}> {
  subject = Subjects.WORKSPACE_CREATED;
}
