/* eslint-disable react/prop-types */
import React from 'react';

import ProjectEditButton from '../ProjectEditButton';
import ProjectDeleteButton from '../ProjectDeleteButton';

function ActionButtons({ id }) {
  return (
    <>
      <ProjectEditButton id={id} />
      <ProjectDeleteButton id={id} />
    </>
  );
}

export default ActionButtons;
