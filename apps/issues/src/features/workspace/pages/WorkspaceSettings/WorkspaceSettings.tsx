import { CustomTabPanel } from "../../../../common/components/CustomTabPanel";

import Grid from "@mui/material/Grid";
import { useContext } from "react";
import WorkspaceName from "../../components/WorkspaceName";

import { useForm } from "react-hook-form";

import WorkspaceDescription, {
  type UpdateWorkspaceForm,
} from "../../components/WorkspaceDescription/WorkspaceDescription";
import { WorkspaceTabContext } from "../Workspace/Workspace";

export default function WorkspaceSettings() {
  const { selectedTab } = useContext(WorkspaceTabContext);

  const form = useForm<UpdateWorkspaceForm>({
    defaultValues: { name: "", description: "" },
    mode: "all",
  });

  const { handleSubmit } = form;

  return (
    <CustomTabPanel id="0" selectedTabId={String(selectedTab)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WorkspaceName form={form} defaultSchemas={{}} handleSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12}>
          <WorkspaceDescription form={form} defaultSchemas={{}} handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </CustomTabPanel>
  );
}
