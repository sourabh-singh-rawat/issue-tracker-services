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
  useGetProjectIssuesStatusCountQuery,
  useUpdateProjectMutation,
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
          <MuiTypography variant="body1" fontWeight={600}>
            Issues
          </MuiTypography>
          <MuiGrid container spacing={2}>
            <MuiGrid item>
              <IssueCard
                title={"Total Issues"}
                count={totalIssueCount}
                percentCount={0}
                bgColor={"primary.slate"}
              />
            </MuiGrid>
            <MuiGrid item>
              <IssueCard
                title={"Open"}
                count={issuesStatusCount[0].count}
                percentCount={0}
                color={"primary.slate"}
                bgColor={"primary.coral"}
              />
            </MuiGrid>
            <MuiGrid item>
              <IssueCard
                title={"In Progress"}
                count={issuesStatusCount[1].count}
                percentCount={0}
                color={"primary.slate"}
                bgColor={"primary.oatmeal"}
              />
            </MuiGrid>
            <MuiGrid item>
              <IssueCard
                title={"In Review"}
                count={issuesStatusCount[2].count}
                percentCount={0}
                color={"primary.slate"}
                bgColor={"primary.chartreuse"}
              />
            </MuiGrid>
            <MuiGrid item>
              <IssueCard
                title={"Closed"}
                count={issuesStatusCount[3].count}
                percentCount={0}
                color={"primary.slate"}
                bgColor={"primary.sea"}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid item sm={12}>
          <MembersCard />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectOverview;
