import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useController, useForm } from 'react-hook-form';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
// constants and services
import { REGEX } from '../constants';
import { SERVER_BASE_API, USER_API } from '../constants/endpoints'; // TODO

// eslint-disable-next-line react/prop-types
function ResetPasswordDialog({ open, handleClose }) {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  useEffect(() => {
    reset();
  }, [open]);

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

  const handleResetSubmit = () => {
    setLoading(true);
    const data = {
      email: getValues('email'),
    };
    fetch(`${SERVER_BASE_API}${USER_API.RESET_PASSWORD_LINK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok || res.status >= 400) {
        if (res.status === 404) {
          setErrorMsg('No account found linked to this email. Please sign up');
        } else {
          setErrorMsg(
            'Error occured while sending reset password link. Please try again later.'
          );
        }
        setError(true);
      } else {
        setSuccess(true);
        handleClose(false);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please eneter your registred email address
          </DialogContentText>
          <form>
            <TextField
              {...userNameProps}
              inputRef={ref}
              error={invalid}
              label={t('login.email')}
              type="email"
              helperText={userNameError?.message}
              margin="dense"
              fullWidth
              required
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={invalid || getValues('email') === '' || loading}
            onClick={handleResetSubmit}
          >
            {loading ? <CircularProgress size={20} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
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
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Reset password link sent.</Alert>
      </Snackbar>
    </>
  );
}

export default ResetPasswordDialog;
