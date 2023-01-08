import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { getUserHistory } from '../ducks/userHistory';
import { saveExamData } from '../ducks/examInfo';
import {
  userHistorySelector,
  accessTokenSelector,
  userNameSelector,
  examInfoSelector,
} from '../selectors';
import Rank from './Rank';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

function UserHistory() {
  const [openRank, setOpenRank] = useState(false);
  const [rollNo, setRollNo] = useState();
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const navigate = useNavigate();
  const { loading, error, data = [] } = useSelector(userHistorySelector);
  const { loading: examInfoLoading } = useSelector(examInfoSelector);
  const userName = useSelector(userNameSelector);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserHistory({ accessToken }));
    }
  }, []);

  const handleClose = () => {
    setOpenRank(false);
  };

  const handleCheckRank = (r) => {
    setRollNo(r);
    setOpenRank(true);
  };

  const handleCheckResult = async ({ url }) => {
    try {
      await dispatch(saveExamData({ examUrl: url, saveData: false })).unwrap();
      navigate('/result');
    } catch (e) {
      console.log('error');
    }
  };
  if (examInfoLoading) {
    return (
      <Dialog open maxWidth="sm" fullWidth>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isEmpty(error)) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
            padding: 2,
          }}
        >
          <Typography variant="h4">Hi {userName}</Typography>
          <Typography variant="h5" color="text.subtitle">
            Here you can find out history of all submissions you made
          </Typography>
          {!isEmpty(error) ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2}>
              {data.map(({ rollNumber, mark, url }) => (
                <Grid item key={rollNumber} xs={12} sm={12} md={6} lg={4}>
                  <StyledCard sx={{ padding: 2 }}>
                    <Grid container>
                      <Grid item xs={8} lg={7}>
                        <Typography variant="h6">{rollNumber}</Typography>
                      </Grid>
                      <Grid item xs={4} lg={5}>
                        <Typography
                          variant="h6"
                          textAlign="end"
                          color="text.subtitle"
                          display={{ xs: 'none', sm: 'block' }}
                        >
                          Mark: {mark}
                        </Typography>
                        <Typography
                          variant="h6"
                          textAlign="end"
                          color="text.subtitle"
                          display={{ xs: 'block', sm: 'none' }}
                        >
                          {mark}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box
                      mt={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Button
                        size="large"
                        variant="contained"
                        onClick={() => {
                          handleCheckRank(rollNumber);
                        }}
                      >
                        Check Rank
                      </Button>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={() => {
                          handleCheckResult({ url });
                        }}
                      >
                        Check Result
                      </Button>
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Card>
      </Container>
      <Dialog fullWidth open={openRank} maxWidth="sm">
        <DialogTitle>Predicted Ranks</DialogTitle>
        <DialogContent>
          <Rank rollNumber={rollNo} />
        </DialogContent>
        <DialogActions disableSpacing>
          <Button size="large" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserHistory;
