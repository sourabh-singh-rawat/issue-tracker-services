/* eslint-disable react/jsx-one-expression-per-line */
import { formatDistance, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiTypography from "@mui/material/Typography";

import { setActivity } from "../../project.slice";
import TabPanel from "../../../../common/components/TabPanel";

function ProjectActivity() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const { data } = useGetProjectActivityQuery(id);

  const projectActivities = useSelector((store) => store.project.activity);

  useEffect(() => {
    dispatch(setActivity({ ...data }));
  }, [data]);

  return (
    <TabPanel index={3} selectedTab={selectedTab}>
      {projectActivities.rows.map((activity) => (
        <MuiTypography key={activity.id} variant="body2">
          <b>{activity.userName}</b> {activity.activityDescription}{" "}
          <b>
            {formatDistance(parseISO(activity.createdAt), new Date(), {
              includeSeconds: true,
              addSuffix: true,
            })}
          </b>
          .
        </MuiTypography>
      ))}
    </TabPanel>
  );
}

export default ProjectActivity;
