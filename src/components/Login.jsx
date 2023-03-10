import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// @mui
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
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import * as Sentry from '@sentry/react';
import { isEmpty } from 'lodash';
import { REGEX } from '../constants';
import CenterCircularProgress from './CenterCircularProgress';
import { signInUser } from '../ducks/auth';
import {
  accessTokenSelector,
  authDataSelector,
  userEmailSelector,
} from '../selectors';
import ResetPasswordDialog from './ResetPasswordDialog';

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector(authDataSelector);
  const accessToken = useSelector(accessTokenSelector);
  const email = useSelector(userEmailSelector);

  const [showError, setShowError] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      navigate('/dashboard');
    }
    if (email) {
      Sentry.setUser({ email });
    }
  }, [navigate, accessToken, email]);
  const { control, formState, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: { email: 'user@pestoproject.com', password: 'pesto@123' },
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

  const handleReset = () => {
    setShowError(false);
    reset();
  };

  return (
    <Container maxWidth="sm">
      {loading && <CenterCircularProgress />}
      <StyledCard
        sx={{
          padding: { xs: '2rem 1rem', sm: '2rem' },
        }}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" textAlign="center">
                {t('generic.login')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-testid="ipemail"
                {...userNameProps}
                inputRef={ref}
                error={invalid}
                label={t('login.email')}
                type="email"
                helperText={userNameError?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-testid="ippassword"
                {...passwordProps}
                inputRef={passwordRef}
                error={passwordInvalid}
                label={t('login.password')}
                helperText={passwordError?.message}
                required
                type="password"
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
                  setShowError(true);
                  dispatch(signInUser(getValues()));
                }}
              >
                {t('generic.login')}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                size="large"
                data-testid="btnreset"
                variant="outlined"
                onClick={handleReset}
                fullWidth
              >
                {t('generic.reset')}
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
                  display: { xs: 'none', md: 'flex' },
                  columnGap: '0.5rem',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" textAlign="center">
                  {t('login.notOnRankiq')}
                </Typography>
                <StyledLink
                  component={RouterLink}
                  variant="body1"
                  color="primary.main"
                  to="/signup"
                >
                  {t('login.signup')}
                </StyledLink>

                <Typography variant="body1" textAlign="center">
                  |
                </Typography>

                <StyledLink
                  data-testid="forgotpwd"
                  component={RouterLink}
                  variant="body1"
                  color="primary.main"
                  onClick={() => setOpenResetDialog(true)}
                >
                  {t('login.resetPassword')}
                </StyledLink>
              </Box>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    columnGap: '0.5rem',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body1" textAlign="center">
                    {t('login.notOnRankiq')}
                  </Typography>
                  <StyledLink
                    component={RouterLink}
                    variant="body1"
                    color="primary.main"
                    to="/signup"
                  >
                    {t('login.signup')}
                  </StyledLink>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    columnGap: '0.5rem',
                    justifyContent: 'center',
                  }}
                >
                  <StyledLink
                    component={RouterLink}
                    variant="body1"
                    color="primary.main"
                    onClick={() => setOpenResetDialog(true)}
                  >
                    {t('login.resetPassword')}
                  </StyledLink>
                </Box>
              </Grid>
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
                {t('login.guest')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledCard>
      <ResetPasswordDialog
        open={openResetDialog}
        handleClose={() => setOpenResetDialog(false)}
      />
    </Container>
  );
}

export default Sentry.withProfiler(Login, { name: 'Login' });
