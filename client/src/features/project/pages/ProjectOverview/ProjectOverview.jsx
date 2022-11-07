import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import MembersCard from "../../../../common/MembersCard";
import PageDescription from "../../../../common/Description";
import IssueStats from "../../components/containers/IssueStats";

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
  const projectIssueStatusCount = useGetProjectIssuesStatusCountQuery(id);
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();
  const project = useSelector((store) => store.project.settings);
  const issuesStatusCount = useSelector(
    (store) => store.project.issuesStatusCount
  );

  const updateDescriptionQuery = () => {
    updateProjectMutation({
      id,
      body: { description: project.description },
    });
  };

  useEffect(() => {
    if (projectIssueStatusCount.isSuccess) {
      dispatch(setIssueStatusCount(projectIssueStatusCount.data));
    }
  }, [projectIssueStatusCount.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container spacing={2}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body1" fontWeight={500}>
            Description:
          </MuiTypography>
          <PageDescription
            page={project}
            loading={project.loading}
            updateDescription={updateProject}
            updateDescriptionQuery={updateDescriptionQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body1" fontWeight={500}>
            Members:
          </MuiTypography>
          <MembersCard />
        </MuiGrid>

        <MuiGrid item sm={12}>
          <MuiTypography variant="body1" fontWeight={500}>
            Issue Stats:
          </MuiTypography>
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
