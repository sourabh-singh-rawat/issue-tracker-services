import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/SectionHeader";

export default function Profile() {
  const profile = useSelector((store) => store.profile);
  console.log(profile);

  return (
    <MuiGrid>
      <SectionHeader title="Your Profile" subtitle="" />
    </MuiGrid>
  );
}
