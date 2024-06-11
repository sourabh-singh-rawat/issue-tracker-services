import React from "react";
import Breadcrumbs from "../../../../common/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";

interface IssuePathProps {
  projectName: string;
  projectId: string;
  isLoading: boolean;
  tabName: string;
}

export default function IssuePath({
  projectName,
  projectId,
  tabName,
  isLoading,
}: IssuePathProps) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      isLoading={isLoading}
      items={[
        { text: "Projects", onClick: () => navigate("/projects") },
        {
          text: projectName,
          onClick: () => navigate(`/projects/${projectId}/overview`),
        },
        {
          text: "Issues",
          onClick: () => navigate(`/projects/${projectId}/issues`),
        },
        {
          text: tabName,
        },
      ]}
    />
  );
}
