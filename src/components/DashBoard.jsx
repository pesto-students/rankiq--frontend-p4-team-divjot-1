import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
// services
import { saveExamData } from '../ducks/examInfo';
import { EXAM_CATEGORY, EXAM_RESERVATION, EXAM_ZONES } from '../constants/exam';
import { ERROR_MESSAGE } from '../constants';

function DashBoard() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: { zone: '', reservation: '', category: '', examUrl: '' },
  });

  const onSubmit = (data) => {
    console.info('data ', data);
  };

  // const handleSaveData = (data) => {
  //   console.info(dispatch(saveExamData(data)));
  // };

  const handleReset = () => {
    reset();
  };

  return (
    <div>
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
            }}
          />
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
                RRC Group D
              </Typography>
            </Grid>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="examUrl"
                    control={control}
                    rules={{ required: ERROR_MESSAGE.REQUIRED }}
                    render={({
                      field: { ref, ...urlProps },
                      fieldState: { invalid, error },
                    }) => (
                      <TextField
                        label="Answersheet Url"
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
                    rules={{ required: ERROR_MESSAGE.REQUIRED }}
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
                          item.label ? item.label : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Category"
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
                    rules={{ required: ERROR_MESSAGE.REQUIRED }}
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
                          item.label ? item.label : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Reservation"
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
                    rules={{ required: ERROR_MESSAGE.REQUIRED }}
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
                          item.label ? item.label : ''
                        }
                        getOptionSelected={(option, val) =>
                          val === undefined ||
                          val === '' ||
                          option.value === val.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Zone"
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
                    disabled={!isEmpty(errors)}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
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
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashBoard;
