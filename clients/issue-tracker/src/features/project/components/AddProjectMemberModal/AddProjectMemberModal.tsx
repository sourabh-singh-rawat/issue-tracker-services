import React from "react";
import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";
import dayjs from "dayjs";

import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MuiListItemText from "@mui/material/ListItemText";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

import Avatar from "../../../../common/components/Avatar";

import { useSelectedTab } from "../../../../common/hooks";
import { useGetWorkspaceMemberListQuery } from "../../../../api/generated/workspace.api";
import RoleSelector from "../RoleSelector";

interface AddProjectMemberModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddProjectMemberModal({
  open,
  handleClose,
}: AddProjectMemberModalProps) {
  const { id } = useSelectedTab();

  // const { data: workspaceMemberList } = useGetWorkspaceMemberListQuery({
  //   id,
  // });

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="Add new member to this project"
        subtitle="Only admin and owners can add new members"
        handleClose={handleClose}
      />
      <ModalBody>
        <MuiList dense>
          {
            // {workspaceMemberList?.rows?.map(
            //   ({
            //     id,
            //     displayName,
            //     email,
            //     createdAt,
            //     role,
            //     workspaceId,
            //     inviteStatus,
            //   }) => (
            //     <MuiListItem
            //       xs={12}
            //       key={id}
            //       secondaryAction={
            //         <RoleSelector
            //           defaultRole={role}
            //           inviteStatus={inviteStatus}
            //           userId={id}
            //           workspaceId={workspaceId}
            //         />
            //       }
            //       item
            //     >
            //       <MuiListItemAvatar>
            //         <Avatar label={displayName} width="24" height="24" />
            //       </MuiListItemAvatar>
            //       <MuiListItemText
            //         primary={
            //           <MuiTypography fontWeight={600}>
            //             {displayName}
            //           </MuiTypography>
            //         }
            //         secondary={
            //           <MuiBreadcrumbs separator="•">
            //             <MuiTypography variant="body2">{email}</MuiTypography>
            //             <MuiTypography variant="body2">
            //               {dayjs(createdAt).fromNow()}
            //             </MuiTypography>
            //           </MuiBreadcrumbs>
            //         }
            //       />
            //     </MuiListItem>
            //   ),
            // )}
          }
        </MuiList>
      </ModalBody>
    </Modal>
  );
}
