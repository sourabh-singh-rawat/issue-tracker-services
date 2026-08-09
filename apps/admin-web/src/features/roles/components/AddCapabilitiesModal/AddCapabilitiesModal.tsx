import Stack from "@mui/material/Stack";
import { useGetCapabilitiesQuery, useUpdateRoleMutation } from "@generated/gql";
import { Modal, ModalBody, ModalHeader, PrimaryButton, SecondaryButton } from "@pine/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type MouseEvent } from "react";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CapabilityMultiSelect } from "../CapabilityMultiSelect";

export type AddCapabilitiesModalProps = {
  roleId: string;
  existingCapabilityKeys: string[];
  open: boolean;
  onClose: () => void;
};

export const AddCapabilitiesModal = ({
  roleId,
  existingCapabilityKeys,
  open,
  onClose,
}: AddCapabilitiesModalProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const updateRoleMutation = useUpdateRoleMutation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const existingKeySet = useMemo(() => new Set(existingCapabilityKeys), [existingCapabilityKeys]);

  const capabilitiesQuery = useGetCapabilitiesQuery(undefined, {
    enabled: open,
    select: (data) =>
      (data.getCapabilities ?? [])
        .filter(
          (capability): capability is typeof capability & { key: string } =>
            Boolean(capability.key) && !existingKeySet.has(capability.key as string),
        )
        .map((capability) => ({
          key: capability.key,
          service: capability.service ?? null,
          resource: capability.resource ?? null,
          action: capability.action ?? null,
        })),
  });

  const handleClose = (event?: MouseEvent | object) => {
    if (event && "stopPropagation" in event && typeof event.stopPropagation === "function") {
      event.stopPropagation();
    }
    setSelectedKeys([]);
    onClose();
  };

  const handleSubmit = async () => {
    if (selectedKeys.length === 0) {
      return;
    }

    const nextKeys = [...new Set([...existingCapabilityKeys, ...selectedKeys])];

    try {
      await updateRoleMutation.mutateAsync({
        input: {
          roleId,
          capabilityKeys: nextKeys,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["GetRole", { id: roleId }] });
      snackbar.success(
        selectedKeys.length === 1
          ? "Capability added successfully"
          : "Capabilities added successfully",
      );
      setSelectedKeys([]);
      onClose();
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to add capabilities"));
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader title="Add capabilities" handleClose={handleClose} />
      <ModalBody>
        <Stack spacing={2}>
          <CapabilityMultiSelect
            capabilities={capabilitiesQuery.data ?? []}
            value={selectedKeys}
            onChange={setSelectedKeys}
            isLoading={capabilitiesQuery.isPending}
            isError={capabilitiesQuery.isError}
            error={capabilitiesQuery.error}
            disabled={updateRoleMutation.isPending}
          />

          <Stack direction="row-reverse" spacing={1} sx={{ pt: 1, alignItems: "center" }}>
            <PrimaryButton
              type="button"
              label="Add"
              loading={updateRoleMutation.isPending}
              isDisabled={selectedKeys.length === 0 || updateRoleMutation.isPending}
              onClick={() => {
                void handleSubmit();
              }}
            />
            <SecondaryButton
              type="button"
              label="Cancel"
              onClick={() => {
                handleClose();
              }}
            />
          </Stack>
        </Stack>
      </ModalBody>
    </Modal>
  );
};
