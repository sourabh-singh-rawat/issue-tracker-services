import React, { useState } from "react";

import MuiGrid from "@mui/material/Grid";
import MemberList from "../../components/MemberList";
import TabPanel from "../../../../common/components/TabPanel";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddProjectMemberModal from "../../components/AddProjectMemberModal";

import { useTheme } from "@mui/material";
import { useSelectedTab } from "../../../../common/hooks";

export default function ProjectMembers() {
  const theme = useTheme();
  const { selectedTab, id, page } = useSelectedTab();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid sx={{ py: theme.spacing(2) }} container>
        <MuiGrid item flexGrow={1}></MuiGrid>
        <MuiGrid item>
          <PrimaryButton
            label="Add Member"
            startIcon={<PersonAddAlt1Icon />}
            onClick={handleOpen}
          />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <MemberList members={page?.members} projectId={id} />
        </MuiGrid>
      </MuiGrid>
      <AddProjectMemberModal open={open} handleClose={handleClose} />
    </TabPanel>
  );
}
