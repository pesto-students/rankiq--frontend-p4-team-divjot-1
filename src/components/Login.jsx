import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useController, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { REGEX, ERROR_MESSAGE } from '../constants';
import { signInUser } from '../ducks/auth';
import { accessTokenSelector, authDataSelector } from '../selectors';

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  borderRadius: '1.3125rem',
}));

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { error, loading } = useSelector(authDataSelector);
  const accessToken = useSelector(accessTokenSelector);

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      navigate('/dashboard');
    }
  }, [navigate, accessToken]);
  const { control, formState, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const {
    field: { ref, ...userNameProps },
    fieldState: { invalid, error: userNameError },
  } = useController({
    name: 'email',
    control,
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
      pattern: { value: REGEX.EMAIL, message: ERROR_MESSAGE.EMAIL },
    },
  });

  const {
    field: { ref: passwordRef, ...passwordProps },
    fieldState: { invalid: passwordInvalid, error: passwordError },
  } = useController({
    name: 'password',
    control,
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
      pattern: { value: REGEX.PASSWORD, message: ERROR_MESSAGE.PASSWORD },
    },
  });

  const handleReset = () => {
    setShowError(false);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <StyledBox
        sx={{
          padding: { xs: '2rem 1rem', sm: '2rem' },
        }}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" textAlign="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...userNameProps}
                inputRef={ref}
                error={invalid}
                label="Email Id"
                type="email"
                helperText={userNameError?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...passwordProps}
                inputRef={passwordRef}
                error={passwordInvalid}
                label="Password"
                helperText={passwordError?.message}
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                variant="contained"
                disabled={!formState.isValid || loading}
                fullWidth
                type="submit"
                onClick={() => {
                  setShowError(true);
                  dispatch(signInUser(getValues()));
                }}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                size="large"
                variant="outlined"
                onClick={handleReset}
                fullWidth
              >
                Reset
              </Button>
            </Grid>
            {!isEmpty(error) && showError && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  columnGap: '0.5rem',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" textAlign="center">
                  Not on RankIQ yet?
                </Typography>
                <StyledLink
                  component={RouterLink}
                  variant="body1"
                  color="primary.main"
                  to="/signup"
                >
                  signup
                </StyledLink>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider>OR</Divider>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Continue as Guest
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledBox>
    </Container>
  );
}

export default Login;
