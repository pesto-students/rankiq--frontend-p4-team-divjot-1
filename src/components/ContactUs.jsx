import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// cmp
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import Paper from '@mui/material/Paper';
// services
import { ERROR_MESSAGE } from '../constants';

// send email api;

function ContactUS() {
  const { t } = useTranslation();
  const { handleSubmit, getValues, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      fName: '',
      lName: '',
      emailId: '',
      subject: '',
      feedback: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSendFeedback = () => {
    setLoading(true);
    const { fName, lName, emailId, subject, feedback } = getValues();

    const data = {
      fName,
      lName,
      emailId,
      subject,
      feedback,
    };

    // TODO: Send Mail API
    setTimeout(() => {
      console.info(data);
      setLoading(false);
    }, 5000);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        sx={{
          paddingY: '50px',
          paddingX: '24px',
          width: '100%',
        }}
      >
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
                name="subject"
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
                name="feedback"
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
              <LoadingButton
                size="large"
                variant="contained"
                loading={loading}
                onClick={handleSubmit(handleSendFeedback)}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default ContactUS;
