import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/tabs/TabPanel";
import MembersCard from "../../../../common/cards/MembersCard";
import PageDescription from "../../../../common/textfields/Description";
import IssueStats from "../../components/containers/IssueStats";

import { setIssueStatusCount, updateProject } from "../../slice/project.slice";
import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";

import {
  useUpdateProjectMutation,
  useGetProjectIssuesStatusCountQuery,
} from "../../api/project.api";
import { CircularProgress } from "@mui/material";

const ProjectOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const project = useSelector((store) => store.project.settings);
  const issuesStatusCount = useSelector(
    (store) => store.project.issuesStatusCount
  );

  const projectIssueStatusCount = useGetProjectIssuesStatusCountQuery(id);
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

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
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container spacing={2}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <PageDescription
            page={project}
            isLoading={project.isLoading}
            updateDescription={updateProject}
            updateDescriptionQuery={updateDescriptionQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body2" fontWeight={600}>
            Members:
          </MuiTypography>
          <MembersCard />
        </MuiGrid>

        <MuiGrid item sm={12}>
          {issuesStatusCount.isLoading ? (
            <CircularProgress />
          ) : (
            <Fragment>
              <MuiTypography variant="body2" fontWeight={600}>
                Issue Stats:
              </MuiTypography>
              <IssueStats issuesStatusCount={issuesStatusCount.rows} />
            </Fragment>
          )}
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectOverview;
