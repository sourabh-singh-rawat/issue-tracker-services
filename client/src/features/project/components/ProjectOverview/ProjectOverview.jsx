import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiTypography from "@mui/material/Typography";
import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/TabPanel";
import PageDescription from "../../../../common/Description";
import IssueCard from "../../../../common/IssueCard";
import MembersCard from "../../../../common/MembersCard";

import { setIssueStatusCount, updateProject } from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

import {
  useUpdateProjectMutation,
  useGetProjectIssuesStatusCountQuery,
} from "../../project.api";
import IssueStats from "../../../../common/IssueStats/IssueStats";

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

  let totalIssueCount = issuesStatusCount.reduce(
    (prev, cur) => (prev += parseInt(cur.count)),
    0
  );

  const updateDescriptionQuery = () => {
    updateProjectMutation({
      uid: id,
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
        <MuiGrid item sm={12}>
          <MuiTypography variant="body1" fontWeight={600}>
            Description
          </MuiTypography>
          <PageDescription
            page={project}
            updateDescription={updateProject}
            updateDescriptionQuery={updateDescriptionQuery}
            loading={project.loading}
          />
        </MuiGrid>
        <MuiGrid item sm={12}>
          <IssueStats issuesStatusCount={issuesStatusCount} />
        </MuiGrid>
        <MuiGrid item sm={12}>
          <MembersCard />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectOverview;
