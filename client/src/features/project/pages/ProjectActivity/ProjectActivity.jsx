/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { parseISO, formatDistance } from 'date-fns';

import MuiTypography from '@mui/material/Typography';

import StyledTabPanel from '../../../../common/tabs/TabPanel';

import { useGetProjectActivityQuery } from '../../api/project.api';
import { setActivity } from '../../slice/project.slice';

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
    <StyledTabPanel index={3} selectedTab={selectedTab}>
      {projectActivities.rows.map((activity) => (
        <MuiTypography key={activity.id} variant="body2">
          <b>{activity.userName}</b> {activity.activityDescription}{' '}
          <b>
            {formatDistance(parseISO(activity.createdAt), new Date(), {
              includeSeconds: true,
              addSuffix: true,
            })}
          </b>
          .
        </MuiTypography>
      ))}
    </StyledTabPanel>
  );
}

export default ProjectActivity;
