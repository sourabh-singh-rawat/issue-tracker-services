/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useGridApiContext } from '@mui/x-data-grid';
import IssueStatusSelector from '../../../issue/components/IssueStatusSelector';
import IssuePrioritySelector from '../../../issue/components/IssuePrioritySelector';

import { useUpdateIssueMutation } from '../../../issue/issue.api';
import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';

function StatusAndPrioritySelectorEditCell({ id, field, value }) {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

  const handleChange = async (event) => {
    apiRef.current.startCellEditMode({ id, field });
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    await updateIssueMutation({ id, body: { [field]: event.target.value } });

    if (isValid) apiRef.current.stopCellEditMode({ id, field });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  if (field === 'status') {
    return <IssueStatusSelector handleChange={handleChange} value={value} />;
  }
  if (field === 'priority') {
    return <IssuePrioritySelector handleChange={handleChange} value={value} />;
  }
}

export default StatusAndPrioritySelectorEditCell;
