import TabPanel from "../../../../common/components/CustomTabPanel";

import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useOutletContext, useParams } from "react-router-dom";
import WorkspaceName from "../../components/WorkspaceName";

import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";
import { useForm } from "react-hook-form";

import WorkspaceDescription from "../../components/WorkspaceDescription";

export default function WorkspaceSettings() {
  const theme = useTheme();
  const { id } = useParams();
  const { selectedTab } = useOutletContext<{ selectedTab: number }>();
  // const [getWorkspace] = useLazyGetWorkspaceQuery();
  // const defaultValues: UpdateWorkspaceApiArg["body"] = async () => {
  // if (!id) return { name: "", description: "" };
  // const { data } = await getWorkspace({ id });

  // const row = data;
  // if (row) {
  //   return {
  //     name: row.name,
  //     description: row.description,
  //   };
  // }
  // };
  // const defaultSchemas: any = useMemo(
  //   () =>
  //     schema.paths["/api/v1/workspaces/{id}"].patch.requestBody.content[
  //       "application/json"
  //     ].schema,
  //   [],
  // );

  const { control, formState, handleSubmit } = useForm({
    defaultValues: {},
    mode: "all",
    resolver: ajvResolver(
      {},
      {
        formats: { email: AjvFormats.get("email") },
      },
    ),
  });

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WorkspaceName
            control={control}
            formState={formState}
            defaultSchemas={{}}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <WorkspaceDescription
            control={control}
            formState={formState}
            defaultSchemas={{}}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
