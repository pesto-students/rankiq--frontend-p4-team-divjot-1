import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import * as Sentry from '@sentry/react';
import { isEmpty } from 'lodash';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CenterCircularProgress from './CenterCircularProgress';
import { REGEX } from '../constants';
import { signUpUser } from '../ducks/auth';
import { authDataSelector, accessTokenSelector } from '../selectors';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
function SignUp() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(authDataSelector);
  const { t } = useTranslation();
  const [showSignupError, setSignUpError] = useState(false);
  const accessToken = useSelector(accessTokenSelector);
  const navigate = useNavigate();
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
      required: t('errors.required'),
      pattern: { value: REGEX.EMAIL, message: t('errors.email') },
    },
  });

  const {
    field: { ref: passwordRef, ...passwordProps },
    fieldState: { invalid: passwordInvalid, error: passwordError },
  } = useController({
    name: 'password',
    control,
    rules: {
      required: t('errors.required'),
      pattern: { value: REGEX.PASSWORD, message: t('errors.password') },
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
          return v !== getValues('password') ? t('errors.cpassword') : null;
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
      required: t('errors.required'),
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
      {loading && <CenterCircularProgress />}
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
                {t('generic.signup')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-testid="ipemail"
                {...userNameProps}
                inputRef={ref}
                error={invalid}
                label={t('signup.email')}
                helperText={userNameError?.message}
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                data-testid="ippassword"
                {...passwordProps}
                inputRef={passwordRef}
                error={passwordInvalid}
                label={t('signup.password')}
                helperText={passwordError?.message}
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                data-testid="ipcpassword"
                {...cPasswordProps}
                inputRef={cPasswordRef}
                error={cPasswordInvalid}
                label={t('signup.cpassword')}
                helperText={cPasswordErr?.message}
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                data-testid="ipfname"
                {...fNameProps}
                inputRef={fNameRef}
                error={fNameInvalid}
                label={t('signup.fname')}
                type="text"
                helperText={fnameError?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                data-testid="iplname"
                {...lNameProps}
                inputRef={lNameRef}
                label={t('signup.lname')}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                data-testid="btnSubmit"
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
                {t('generic.signup')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                data-aq="btnreset"
                size="large"
                variant="outlined"
                onClick={handleReset}
                fullWidth
              >
                {t('generic.reset')}
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
                  {t('signup.already')}
                </Typography>
                <StyledLink component={RouterLink} variant="body1" to="/login">
                  {t('signup.login')}
                </StyledLink>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider>{t('login.or')}</Divider>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                data-testid="btnGuest"
                variant="contained"
                fullWidth
                onClick={() => {
                  Sentry.setUser({ email: 'guest' });
                  navigate('/dashboard');
                }}
              >
                {t('signup.guest')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledCard>
    </Container>
  );
}

export default Sentry.withProfiler(SignUp, { name: 'Signup' });
