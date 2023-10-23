import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import { CircularProgress, Divider, useTheme } from "@mui/material";

import TabPanel from "../../../../common/components/TabPanel";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { useUpdateProjectMutation } from "../../../../api/generated/project.api";
import Description from "../../../../common/components/Description";
import { setProject } from "../../project.slice";

function ProjectOverview() {
  const theme = useTheme();
  // const { id } = useParams();
  const dispatch = useAppDispatch();
  const [selectedTab] = useOutletContext();

  const projectSettings = useAppSelector((s) => s.project.settings);
  // const issuesStatusCount = useAppSelector((s) => s.project.issuesStatusCount);

  const [updateProject, { isSuccess }] = useUpdateProjectMutation();

  const updateDescriptionQuery = () => {
    updateProject({
      id,
      body: { description: projectSettings.description },
    });
  };

  // useEffect(() => {
  //   if (projectIssueStatusCount.isSuccess) {
  //     dispatch(setIssueStatusCount(projectIssueStatusCount.data.rows));
  //   }
  // }, [projectIssueStatusCount.data]);

  useEffect(() => {
    // if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid container spacing={2}>
        <MuiGrid md={8} item></MuiGrid>
        <MuiGrid md={4} item>
          <MuiGrid container rowSpacing={1} marginTop={2}>
            <MuiGrid xs={12} item>
              <Description
                isLoading={projectSettings.isLoading}
                page={projectSettings}
                updateDescription={setProject}
                updateDescriptionQuery={updateDescriptionQuery}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        {/* <MuiGrid sm={12} item>
          {issuesStatusCount.isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.grey[200] }}
                variant="body1"
              >
                Issue Stats:
              </MuiTypography>
              <IssueStats issuesStatusCount={issuesStatusCount.rows} />
            </>
          )}
        </MuiGrid> */}
      </MuiGrid>
    </TabPanel>
  );
}

export default ProjectOverview;
