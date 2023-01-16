import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
// cmp
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// services
import { ERROR_MESSAGE } from '../constants';
import { SERVER_BASE_API, FEEDBACK_API } from '../constants/endpoints';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
  padding: '3.125rem 1.5rem',
  width: '100%',
}));

function ContactUS() {
  const { t } = useTranslation();
  const { handleSubmit, getValues, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      fName: '',
      lName: '',
      emailId: '',
      sub: '',
      feedbackMessage: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = (isSuccess) => {
    if (isSuccess) {
      reset();
      setSuccess(false);
    } else {
      setError(false);
    }
    setLoading(false);
  };

  const handleSendFeedback = () => {
    setLoading(true);
    const { fName, lName, emailId, sub, feedbackMessage } = getValues();

    const data = {
      firstName: fName,
      lastName: lName,
      email: emailId,
      subject: sub,
      feedback: feedbackMessage,
    };

    fetch(`${SERVER_BASE_API}${FEEDBACK_API.SEND}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok || res.status >= 400) {
        setError(true);
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyledPaper>
        <Grid item sx={{ mb: 2 }}>
          <Typography variant="h4" textAlign="center">
            {t('contactUs.pageTitle')}
          </Typography>
        </Grid>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: ERROR_MESSAGE.REQUIRED }}
                render={({
                  field: { ref, ...fNameProps },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    label={t('contactUs.fName')}
                    fullWidth
                    error={invalid}
                    helperText={error?.message}
                    {...fNameProps}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: ERROR_MESSAGE.REQUIRED }}
                render={({
                  field: { ref, ...lNameProps },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    label={t('contactUs.lName')}
                    fullWidth
                    error={invalid}
                    helperText={error?.message}
                    {...lNameProps}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name="emailId"
                control={control}
                rules={{ required: ERROR_MESSAGE.REQUIRED }}
                render={({
                  field: { ref, ...emailIdProps },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    label={t('contactUs.emailId')}
                    fullWidth
                    error={invalid}
                    helperText={error?.message}
                    {...emailIdProps}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name="sub"
                control={control}
                rules={{ required: ERROR_MESSAGE.REQUIRED }}
                render={({
                  field: { ref, ...subjectProps },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    label={t('contactUs.subject')}
                    fullWidth
                    error={invalid}
                    helperText={error?.message}
                    {...subjectProps}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name="feedbackMessage"
                control={control}
                rules={{ required: ERROR_MESSAGE.REQUIRED }}
                render={({
                  field: { ref, ...feedbackProps },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    label={t('contactUs.feedback')}
                    fullWidth
                    multiline
                    rows={5}
                    error={invalid}
                    helperText={error?.message}
                    {...feedbackProps}
                  />
                )}
              />
            </Grid>
            <Grid
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              item
              xs={12}
              sm={12}
              md={12}
            >
              <Button
                size="large"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit(handleSendFeedback)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={() => handleClose(false)}
      >
        <Alert severity="error">
          Could not send feedback. Please try again
        </Alert>
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
        <Alert severity="success">Fedback sent successfully</Alert>
      </Snackbar>
    </Container>
  );
}

export default Sentry.withProfiler(ContactUS, { name: 'ContactUs' });
