/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MuiBox from '@mui/material/Box';

import IssueAssigneeSelector from '../../../../../common/selects/IssueAssigneeSelector';

import { useUpdateIssueMutation } from '../../../api/issue.api';
import { useGetProjectMembersQuery } from '../../../../project/api/project.api';

import { updateIssue } from '../../../slice/issue.slice';
import { setMembers } from '../../../../project/slice/project.slice';
import { setMessageBarOpen } from '../../../../message-bar/slice/message-bar.slice';

function IssueAssignee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const issue = useSelector((store) => store.issue);
  const project = useSelector((store) => store.project);
  const getProjectMembers = useGetProjectMembersQuery(issue.info.projectId);
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

  useEffect(() => {
    if (getProjectMembers.isSuccess) {
      dispatch(setMembers(getProjectMembers.data));
    }
  }, [getProjectMembers.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  const handleChange = async (e) => {
    const userId = e.target.value;
    await updateIssueMutation({ id, body: { assigneeId: userId } });
    dispatch(updateIssue({ assigneeId: userId }));
  };

  return (
    <MuiBox sx={{ marginTop: '8px' }}>
      <IssueAssigneeSelector
        value={!issue.info.assigneeId ? 0 : issue.info.assigneeId}
        projectMembers={project.members.rows}
        isLoading={project.members.isLoading}
        handleChange={handleChange}
      />
    </MuiBox>
  );
}

export default IssueAssignee;
