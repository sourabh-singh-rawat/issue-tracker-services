import { Fragment, useState } from "react";

import ProjectEditButton from "../ProjectEditButton";
import ProjectDeleteButton from "../ProjectDeleteButton";

const ActionButtons = ({ id }) => {
  return (
    <Fragment>
      <ProjectEditButton id={id} />
      <ProjectDeleteButton id={id} />
    </Fragment>
  );
};

export default ActionButtons;
