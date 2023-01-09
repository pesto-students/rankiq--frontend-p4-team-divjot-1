import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GaugeChart from 'react-gauge-chart';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Rank from './Rank';
import {
  getUserInitialsSelector,
  primaryDetailsSelector,
  isExamInfoPresentSelector,
  sectionDetailsSelector,
} from '../selectors';
import { MARKING } from '../constants/exam';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.box.main,
}));

function Chart({ id, val, maxVal, negative }) {
  let colorsArray = ['#FF0000', '#FFFF00', '#00FF00'];
  if (negative) {
    colorsArray = colorsArray.reverse();
  }
  return (
    <Box>
      <GaugeChart
        id={id}
        style={{ width: '100%', height: '100%' }}
        arcWidth={0.3}
        percent={val / maxVal}
        colors={colorsArray}
        hideText
        formatTextValues={(value) => `${value}/100`}
      />
    </Box>
  );
}
Chart.defaultProps = {
  negative: false,
};

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  val: PropTypes.number.isRequired,
  maxVal: PropTypes.number.isRequired,
  negative: PropTypes.bool,
};

function OtherDetailsContent({ label, content }) {
  return (
    <Box sx={{ display: 'flex', columnGap: 1 }}>
      <Typography variant="subtitle2">{label}:</Typography>
      <Typography variant="subtitle2" color="text.subtitle">
        {content}
      </Typography>
    </Box>
  );
}

OtherDetailsContent.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function Result() {
  const navigate = useNavigate();
  const isExamInfoPresent = useSelector(isExamInfoPresentSelector);
  const primaryDetails = useSelector(primaryDetailsSelector);
  const userInitials = useSelector(getUserInitialsSelector);
  const { sectionMarks, correctCount, incorrectCount } = useSelector(
    sectionDetailsSelector
  );
  const [openRank, setOpenRank] = useState(false);
  useEffect(() => {
    if (!isExamInfoPresent) {
      navigate('/dashboard');
    }
  }, [navigate, isExamInfoPresent]);

  const handleClose = () => {
    setOpenRank(false);
  };

  const handleCheckRank = () => {
    setOpenRank(true);
  };

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ padding: { md: 4, xs: 2 } }}>
          <Grid container mb={2} spacing={2}>
            <Grid item>
              <Avatar
                sx={{
                  width: { xs: '4rem' },
                  height: { xs: '4rem' },
                  fontSize: '1.5rem',
                }}
              >
                {userInitials}
              </Avatar>
            </Grid>
            <Grid item xs={9} alignItems="center" alignSelf="center">
              <Typography variant="h5">{primaryDetails.name}</Typography>
              <Typography variant="subtitle2" color="text.subtitle">
                {primaryDetails.rollNumber}
              </Typography>
            </Grid>
          </Grid>
          <StyledCard
            sx={{
              padding: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: { sm: 'row', xs: 'column' },
            }}
          >
            <Box>
              <Typography variant="h5">
                Marks Obtained: {Math.round(sectionMarks * 100) / 100}
              </Typography>
              <Typography variant="subtitle2" color="text.subtitle">
                Total Marks: {correctCount * MARKING.CORRECT}
              </Typography>
              <Typography variant="subtitle2" color="text.subtitle">
                Negative Marks:{' '}
                {Math.round(incorrectCount * MARKING.INCORRECT * 100) / 100}
              </Typography>
            </Box>
            <Chart id="OverAllMarks" val={sectionMarks} maxVal={100} />
          </StyledCard>
          <Grid container mt={3} mb={3} spacing={2}>
            <Grid item xs={4} sm={4}>
              <StyledCard>
                <Typography variant="h5" textAlign="center">
                  Correct: {correctCount}/100
                </Typography>
                <Chart id="correctCount" val={correctCount} maxVal={100} />
              </StyledCard>
            </Grid>
            <Grid item xs={4} sm={4}>
              <StyledCard>
                <Typography variant="h5" textAlign="center">
                  Incorrect: {incorrectCount}/100
                </Typography>
                <Chart
                  id="incorrectCount"
                  negative
                  val={incorrectCount}
                  maxVal={100}
                />
              </StyledCard>
            </Grid>
            <Grid item xs={4} sm={4}>
              <StyledCard>
                <Typography variant="h5" textAlign="center">
                  Unanswered: {100 - (correctCount + incorrectCount)}/100
                </Typography>
                <Chart
                  id="unAnsweredCount"
                  negative
                  val={100 - (correctCount + incorrectCount)}
                  maxVal={100}
                />
              </StyledCard>
            </Grid>
          </Grid>
          <StyledCard sx={{ padding: 1, marginBottom: 3 }}>
            <Typography variant="h5">Other Details</Typography>
            <OtherDetailsContent
              label="Subject"
              content={primaryDetails.subject}
            />
            <OtherDetailsContent
              label="Center"
              content={primaryDetails.center}
            />
            <OtherDetailsContent
              label="Exam Date"
              content={primaryDetails.date}
            />
            <OtherDetailsContent label="Time" content={primaryDetails.time} />
          </StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button size="large" variant="contained" onClick={handleCheckRank}>
              Check Rank
            </Button>
          </Box>
        </Card>
      </Container>
      <Dialog fullWidth open={openRank} maxWidth="sm">
        <DialogTitle>Predicted Ranks</DialogTitle>
        <DialogContent>
          <Rank rollNumber={primaryDetails.rollNumber} />
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

export default Result;
