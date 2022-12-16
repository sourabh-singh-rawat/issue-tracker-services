import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";

import SectionHeader from "../../../../../common/headers/SectionHeader";

const Settings = () => {
  return (
    <MuiGrid container gap="40px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="Settings"
          subtitle="This section contains the settings."
          noButton
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Settings;
