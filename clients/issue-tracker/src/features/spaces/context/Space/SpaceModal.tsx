import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import { useAppSelector } from "../../../../common/hooks";
import { SpaceForm } from "../../components";
import { useSpace } from "./hooks";

export const SpaceModal = () => {
  const defaultWorkspace = useAppSelector((s) => s.workspace._default);
  const { isOpen, handleOpen, handleClose } = useSpace();

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <Add />
      </IconButton>

      {isOpen && (
        <Modal open={isOpen} handleClose={handleClose}>
          <ModalHeader
            title="Create Space"
            subtitle="A Space represents teams, departments, or groups, each with its own Lists, and settings."
            handleClose={handleClose}
          />
          <ModalBody>
            <SpaceForm workspaceId={defaultWorkspace.id} />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
