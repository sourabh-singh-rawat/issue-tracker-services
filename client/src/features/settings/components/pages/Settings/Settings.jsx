/* eslint-disable react/react-in-jsx-scope */
import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../../common/headers/SectionHeader';

function Settings() {
  return (
    <MuiGrid gap="40px" container>
      <MuiGrid xs={12} item>
        <SectionHeader
          subtitle="This section contains the settings."
          title="Settings"
          noButton
        />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Settings;
