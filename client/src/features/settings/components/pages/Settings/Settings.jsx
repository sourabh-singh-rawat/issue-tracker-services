import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../../common/SectionHeader/SectionHeader";

const Settings = () => {
  return (
    <MuiGrid container gap="40px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="Settings"
          subtitle="This section contains the settings."
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Settings;
