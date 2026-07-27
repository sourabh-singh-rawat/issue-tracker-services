import { useParams } from "@tanstack/react-router";

export const useIssueParams = () => {
  const { issueId } = useParams({ strict: false });

  if (!issueId) throw new Error("Issue ID is required");

  return { issueId };
};
