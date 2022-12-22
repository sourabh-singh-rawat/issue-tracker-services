/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import theme from '../../../../config/mui.config';

import { continueWithGoogle } from '../../../../utils/firebase/continue-with-google.utils';
import { onAuthStateChangedListener } from '../../../../config/firebase.config';

function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('inviteToken');
  const loggedInUser = localStorage.getItem('loggedInUser');

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  useEffect(
    () =>
      onAuthStateChangedListener((user) => {
        if (loggedInUser || user) navigate('/');
      }),
    [loggedInUser],
  );

  return (
    <MuiGrid container height="100vh">
      <MuiGrid item md={5} xs={12}>
        <MuiContainer maxWidth="xs">
          <MuiGrid container rowSpacing={4}>
            <MuiGrid item xs={12}>
              <Divider>
                <MuiTypography variant="body2">or</MuiTypography>
              </Divider>
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiButton
                variant="outlined"
                onClick={handleContinueWithGoogle}
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
                fullWidth
              >
                Create account with Google
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiContainer>
      </MuiGrid>
      <MuiGrid
        md={7}
        xs={12}
        sx={{ backgroundColor: theme.palette.grey[100] }}
      />
    </MuiGrid>
  );
}

export default SignUp;
