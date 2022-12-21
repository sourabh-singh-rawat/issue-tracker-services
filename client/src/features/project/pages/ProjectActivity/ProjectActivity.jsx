import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { parseISO, format, formatDistance } from "date-fns";
import { enIN } from "date-fns/locale";

import MuiTypography from "@mui/material/Typography";

import StyledTabPanel from "../../../../common/tabs/TabPanel";

import { useGetProjectActivityQuery } from "../../api/project.api";
import { setActivity } from "../../slice/project.slice";

const ProjectActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const { data } = useGetProjectActivityQuery(id);

  const projectActivities = useSelector((store) => store.project.activity);

  useEffect(() => {
    dispatch(setActivity({ ...data }));
  }, [data]);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={3}>
      {projectActivities.rows.map((activity) => {
        return (
          <MuiTypography variant="body2" key={activity.id}>
            <b>{activity.userName}</b> {activity.activityDescription}{" "}
            <b>
              {formatDistance(parseISO(activity.createdAt), new Date(), {
                includeSeconds: true,
                addSuffix: true,
              })}
            </b>
            {"."}
          </MuiTypography>
        );
      })}
    </StyledTabPanel>
  );
};

export default ProjectActivity;
