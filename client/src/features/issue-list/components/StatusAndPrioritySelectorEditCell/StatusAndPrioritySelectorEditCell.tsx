/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { useGridApiContext } from "@mui/x-data-grid";

import { useAppDispatch } from "../../../../common/hooks";
import Select from "../../../../common/components/Select";

function StatusAndPrioritySelectorEditCell({ id, field, value }) {
  const dispatch = useAppDispatch();
  const apiRef = useGridApiContext();
  // const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

  const handleChange = async (event) => {
    apiRef.current.startCellEditMode({ id, field });
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    // await updateIssueMutation({ id, body: { [field]: event.target.value } });

    if (isValid) apiRef.current.stopCellEditMode({ id, field });
  };

  if (field === "status") {
    return (
      <Select name={field} value={value} options={[]} onChange={handleChange} />
    );
  }
  if (field === "priority") {
    return (
      <Select name={field} value={value} options={[]} onChange={handleChange} />
    );
  }
}

export default StatusAndPrioritySelectorEditCell;
