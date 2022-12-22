/* eslint-disable react/react-in-jsx-scope */
import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../../common/headers/SectionHeader';

function Settings() {
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
}

export default Settings;
