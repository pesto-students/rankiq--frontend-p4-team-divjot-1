import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';
// @mui
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
// redux and services
// import { isEmpty } from 'lodash';
import { REGEX } from '../constants';
import { SERVER_BASE_API, USER_API } from '../constants/endpoints';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('key');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, formState, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const validateConfirmPassword = () => {
    const formvalues = getValues();
    if (formvalues.newPassword === formvalues.confirmPassword) {
      return true;
    }
    return false;
  };

  const {
    field: { ref: newPasswordRef, ...newPasswordProps },
    fieldState: { invalid: newPasswordInvalid, error: newPasswordError },
  } = useController({
    name: 'newPassword',
    control,
    rules: {
      required: t('errors.required'),
      pattern: { value: REGEX.PASSWORD, message: t('errors.password') },
    },
  });

  const {
    field: { ref: confirmPasswordRef, ...confirmPasswordProps },
    fieldState: { invalid: confirmPasswordInvalid },
  } = useController({
    name: 'confirmPassword',
    control,
    rules: {
      required: t('errors.required'),
      validate: (value) => validateConfirmPassword(value),
    },
  });

  const handleReset = () => {
    setError(false);
    setError('');
    reset();
  };

  const handleUpdatePassword = () => {
    setLoading(true);
    const data = {
      resetToken: token,
      password: getValues('newPassword'),
    };
    fetch(`${SERVER_BASE_API}${USER_API.UPDATE_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok || res.status >= 400) {
        setError(true);
        setErrorMsg('Reset password failed please try again later.');
      } else {
        setSuccess(true);
      }
    });
  };

  const handleClose = (isSuccess) => {
    if (isSuccess) {
      setSuccess(false);
    } else {
      setError(false);
    }
    navigate('/login');
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <StyledCard
        sx={{
          padding: { xs: '2rem 1rem', sm: '2rem' },
        }}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                {t('resetPassword.newPassword')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...newPasswordProps}
                inputRef={newPasswordRef}
                error={newPasswordInvalid}
                label={t('resetPassword.newPassword')}
                type="password"
                helperText={
                  newPasswordError?.message ?? 'please enter your new password.'
                }
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...confirmPasswordProps}
                inputRef={confirmPasswordRef}
                error={confirmPasswordInvalid}
                label={t('resetPassword.confirmPassword')}
                helperText={
                  confirmPasswordInvalid
                    ? 'passwords do not match'
                    : 'please enter your new password again'
                }
                type="password"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                variant="contained"
                disabled={!formState.isValid || loading}
                fullWidth
                onClick={handleUpdatePassword}
              >
                {loading ? (
                  <CircularProgress size={25} />
                ) : (
                  t('resetPassword.updatePassword')
                )}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                size="large"
                variant="outlined"
                onClick={handleReset}
                fullWidth
              >
                {t('generic.reset')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledCard>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={() => handleClose(false)}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={success}
        autoHideDuration={6000}
        onClose={() => handleClose(true)}
      >
        <Alert severity="success">Password updated successfully</Alert>
      </Snackbar>
    </Container>
  );
}

export default ResetPassword;
