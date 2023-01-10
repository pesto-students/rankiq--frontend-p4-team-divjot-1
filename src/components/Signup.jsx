import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { isEmpty } from 'lodash';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useController, useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { REGEX, ERROR_MESSAGE } from '../constants';
import { signUpUser } from '../ducks/auth';
import { authDataSelector, accessTokenSelector } from '../selectors';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

function SignUp() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(authDataSelector);
  const [showSignupError, setSignUpError] = useState(false);
  const accessToken = useSelector(accessTokenSelector);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (success) {
      navigate('/login');
    } else if (!isEmpty(accessToken)) {
      navigate('/dashboard');
    }
  }, [navigate, success, accessToken]);

  const { control, formState, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
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

  const {
    field: { ref: cPasswordRef, ...cPasswordProps },
    fieldState: { invalid: cPasswordInvalid, error: cPasswordErr },
  } = useController({
    name: 'confirmPassword',
    control,
    rules: {
      validate: {
        confirmPassword: (v) => {
          return v !== getValues('password') ? 'Password didnt match' : null;
        },
      },
    },
  });

  const {
    field: { ref: fNameRef, ...fNameProps },
    fieldState: { invalid: fNameInvalid, error: fnameError },
  } = useController({
    name: 'firstName',
    control,
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
    },
  });
  const {
    field: { ref: lNameRef, ...lNameProps },
  } = useController({
    name: 'lastName',
    control,
  });

  const handleReset = () => {
    reset();
    setSignUpError(false);
  };
  return (
    <Container maxWidth="md">
      <StyledCard
        sx={{
          padding: { xs: '2rem 1rem', sm: '2rem' },
          mt: { xs: '3rem', sm: '5rem' },
          mb: { xs: '1rem', sm: '3rem' },
        }}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" textAlign="center">
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...userNameProps}
                inputRef={ref}
                error={invalid}
                label="Email id"
                helperText={userNameError?.message}
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                {...cPasswordProps}
                inputRef={cPasswordRef}
                error={cPasswordInvalid}
                label="Confirm Password"
                helperText={cPasswordErr?.message}
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...fNameProps}
                inputRef={fNameRef}
                error={fNameInvalid}
                label="First Name"
                type="text"
                helperText={fnameError?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...lNameProps}
                inputRef={lNameRef}
                label="Last Name"
                type="text"
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
                  setSignUpError(true);
                  dispatch(signUpUser(getValues()));
                }}
              >
                Sign Up
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
            {!isEmpty(error) && showSignupError && (
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
                  Already signed up?
                </Typography>
                <Link
                  component={RouterLink}
                  variant="body1"
                  color={theme.palette.primary.main}
                  to="/login"
                >
                  Login.
                </Link>
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
      </StyledCard>
    </Container>
  );
}

export default SignUp;
