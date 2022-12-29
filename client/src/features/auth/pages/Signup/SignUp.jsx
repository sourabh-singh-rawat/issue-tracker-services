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

import continueWithGoogle from '../../../../utils/firebase/continue-with-google.utils';
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
    <MuiGrid height="100vh" container>
      <MuiGrid md={5} xs={12} item>
        <MuiContainer maxWidth="xs">
          <MuiGrid rowSpacing={4} container>
            <MuiGrid xs={12} item>
              <Divider>
                <MuiTypography variant="body2">or</MuiTypography>
              </Divider>
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiButton
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
                variant="outlined"
                fullWidth
                onClick={handleContinueWithGoogle}
              >
                Create account with Google
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiContainer>
      </MuiGrid>
      <MuiGrid
        md={7}
        sx={{ backgroundColor: theme.palette.grey[100] }}
        xs={12}
      />
    </MuiGrid>
  );
}

export default SignUp;
