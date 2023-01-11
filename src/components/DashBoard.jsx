import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
// cmp
import { isEmpty } from 'lodash';
import CenterCircularProgress from './CenterCircularProgress';
// services
import { saveExamData } from '../ducks/examInfo';
import { authDataSelector, examInfoSelector } from '../selectors';
import { EXAM_CATEGORY, EXAM_RESERVATION, EXAM_ZONES } from '../constants/exam';

function DashBoard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: { zone: '', reservation: '', category: '', examUrl: '' },
  });
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { error: examError, loading } = useSelector(examInfoSelector);
  const { userInfo = {} } = useSelector(authDataSelector);

  const handleSaveData = async () => {
    setShowError(false);
    if (isEmpty(errors)) {
      const { category, zone, reservation, examUrl } = getValues();
      const dataToSubmit = {
        examUrl,
        category: category.value,
        reservation: reservation.value,
        zone: zone.value,
        userId: userInfo?.email || null,
      };
      try {
        await dispatch(saveExamData(dataToSubmit)).unwrap();
        navigate('/result');
      } catch (e) {
        setShowError(true);
      }
    }
  };

  const handleReset = () => {
    setShowError(false);
    reset();
  };
  const requiredText = t('generic.required');

  return (
    <Container maxWidth="xl">
      {loading && <CenterCircularProgress />}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Grid item xs={4} sm={6} md={6}>
          <Card
            sx={{
              padding: { xs: '2rem 1rem', sm: '2rem' },
              mt: '1rem',
              mb: { xs: '1rem', sm: '3rem' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <h2>{t('app.test')}</h2>
          </Card>
        </Grid>
        <Grid item xs={4} sm={6} md={6}>
          <Card
            sx={{
              padding: { xs: '2rem 1rem', sm: '2rem' },
              mt: '1rem',
              mb: { xs: '1rem', sm: '3rem' },
            }}
          >
            <Grid item sx={{ mb: 2 }} xs={12}>
              <Typography variant="h4" textAlign="center">
                {t('dashboard.rrcGroupD')}
              </Typography>
            </Grid>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="examUrl"
                    control={control}
                    rules={{ required: requiredText }}
                    render={({
                      field: { ref, ...urlProps },
                      fieldState: { invalid, error },
                    }) => (
                      <TextField
                        label={t('dashboard.answerUrl')}
                        fullWidth
                        error={invalid}
                        helperText={error?.message}
                        {...urlProps}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="category"
                    rules={{ required: requiredText }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error, invalid },
                    }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        value={value}
                        options={EXAM_CATEGORY}
                        getOptionLabel={(item) =>
                          item.label ? t(`exam.category.${item.key}`) : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('dashboard.category')}
                            margin="normal"
                            variant="outlined"
                            error={invalid}
                            helperText={error?.message}
                            required
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="reservation"
                    rules={{ required: requiredText }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error, invalid },
                    }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        value={value}
                        options={EXAM_RESERVATION}
                        getOptionLabel={(item) =>
                          item.label ? t(`exam.reservation.${item.key}`) : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('dashboard.reservation')}
                            margin="normal"
                            variant="outlined"
                            error={invalid}
                            helperText={error?.message}
                            required
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="zone"
                    rules={{ required: requiredText }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error, invalid },
                    }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        value={value}
                        options={EXAM_ZONES}
                        getOptionLabel={(item) =>
                          item.label ? t(`exam.rrb.${item.key}`) : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('dashboard.zone')}
                            margin="normal"
                            variant="outlined"
                            error={invalid}
                            helperText={error?.message}
                            required
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    disabled={!isEmpty(errors) || loading}
                    onClick={handleSubmit(handleSaveData)}
                  >
                    {t('generic.submit')}
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
                {!isEmpty(examError) && showError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{examError}</Alert>
                  </Grid>
                )}
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashBoard;
