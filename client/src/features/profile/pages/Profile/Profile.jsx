import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/headers/SectionHeader";

const Profile = () => {
  const profile = useSelector((store) => store.profile);

  return (
    <MuiGrid>
      <SectionHeader title="Your Profile" subtitle="" />
    </MuiGrid>
  );
};

export default Profile;
