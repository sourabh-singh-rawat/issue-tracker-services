import { IssueModal } from "../IssueModal";

interface AddIssueButtonProps {
  projectId: string;
}

export const AddIssueButton = ({ projectId }: AddIssueButtonProps) => {
  return <IssueModal projectId={projectId} />;
};
