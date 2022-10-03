import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";

export default function Comment({
  id,
  description,
  creation_date,
  issue_id,
  name,
}) {
  return (
    <Fragment>
      <MuiGrid container>
        <MuiGrid item>
          <MuiAvatar></MuiAvatar>
        </MuiGrid>
        <MuiGrid item>{name}</MuiGrid>
        <MuiGrid item>{creation_date}</MuiGrid>
      </MuiGrid>
      <MuiGrid container>
        <MuiGrid item>{description}</MuiGrid>
      </MuiGrid>
    </Fragment>
  );
}
