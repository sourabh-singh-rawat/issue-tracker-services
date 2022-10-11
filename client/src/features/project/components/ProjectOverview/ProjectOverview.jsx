import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import MembersCard from "../../../../common/MembersCard";
import PageDescription from "../../../../common/Description";
import IssueStats from "../IssueStats";

import { setIssueStatusCount, updateProject } from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

import {
  useUpdateProjectMutation,
  useGetProjectIssuesStatusCountQuery,
} from "../../project.api";

const ProjectOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();
  const project = useSelector((store) => store.project.info);
  const projectIssueStatusCount = useGetProjectIssuesStatusCountQuery(id);
  const issuesStatusCount = useSelector(
    (store) => store.project.issuesStatusCount
  );

  const updateDescriptionQuery = () => {
    updateProjectMutation({
      id,
      payload: { description: project.description },
    });
  };

  useEffect(() => {
    if (projectIssueStatusCount.data) {
      dispatch(setIssueStatusCount(projectIssueStatusCount.data));
    }
  }, [projectIssueStatusCount.isSuccess]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container spacing={4}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body2" fontWeight={600}>
            Description:
          </MuiTypography>
          <PageDescription
            page={project}
            updateDescription={updateProject}
            updateDescriptionQuery={updateDescriptionQuery}
            loading={project.loading}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MembersCard />
        </MuiGrid>
        <MuiGrid item sm={12}>
          <IssueStats
            loading={issuesStatusCount.loading}
            issuesStatusCount={issuesStatusCount.rows}
          />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectOverview;
