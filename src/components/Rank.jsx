import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudentRank } from '../ducks/rankData';
import { rankDataSelector } from '../selectors';

function RankContent({ label, content }) {
  return (
    <>
      <Grid item xs={5}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </>
  );
}
RankContent.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function Rank({ rollNumber }) {
  const { loading, data: rankData, error } = useSelector(rankDataSelector);
  const dispatch = useDispatch();

  const {
    overall,
    zone,
    zoneCategory,
    zoneShift,
    zoneShiftCategory,
    rawMarks,
    zoneSelected,
  } = rankData;

  useEffect(() => {
    if (rollNumber) {
      dispatch(getStudentRank({ rollNumber }));
    }
  }, []);

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

  return (
    <Box>
      {!isEmpty(error) ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container rowSpacing={4}>
          <RankContent
            label="Overall:-"
            content={`${overall?.rank} out of ${overall?.total}`}
          />
          <RankContent
            label="Zone:-"
            content={`${zone?.rank} out of ${zone?.total}`}
          />
          <RankContent
            label="Zone + Category:-"
            content={`${zoneCategory?.rank} out of ${zoneCategory?.total}`}
          />
          <RankContent
            label="Zone + Shift:-"
            content={`${zoneShift?.rank} out of ${zoneShift?.total}`}
          />
          <RankContent
            label="Zone + Shift + Category:-"
            content={`${zoneShiftCategory?.rank} out of ${zoneShiftCategory?.total}`}
          />
          <RankContent label="Raw Marks:-" content={rawMarks} />
          <RankContent label="Zone Selected:-" content={zoneSelected} />
        </Grid>
      )}
    </Box>
  );
}
Rank.propTypes = {
  rollNumber: PropTypes.string.isRequired,
};
export default Rank;
