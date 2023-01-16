import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// services
import * as Sentry from '@sentry/react';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
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
  const { t } = useTranslation();
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
            label={t('rank.overall.label')}
            content={t('rank.overall.content', {
              rank: overall?.rank,
              total: overall?.total,
            })}
          />
          <RankContent
            label={t('rank.zone.label')}
            content={t('rank.zone.content', {
              rank: zone?.rank,
              total: zone?.total,
            })}
          />
          <RankContent
            label={t('rank.zoneCategory.label')}
            content={t('rank.zoneCategory.content', {
              rank: zoneCategory?.rank,
              total: zoneCategory?.total,
            })}
          />
          <RankContent
            label={t('rank.zoneShift.label')}
            content={t('rank.zoneShift.content', {
              rank: zoneShift?.rank,
              total: zoneShift?.total,
            })}
          />
          <RankContent
            label={t('rank.zoneShiftCategory.label')}
            content={t('rank.zoneShiftCategory.content', {
              rank: zoneShiftCategory?.rank,
              total: zoneShiftCategory?.total,
            })}
          />
          <RankContent label={t('rank.rawMarks')} content={rawMarks} />
          <RankContent label={t('rank.zoneSelected')} content={zoneSelected} />
        </Grid>
      )}
    </Box>
  );
}
Rank.propTypes = {
  rollNumber: PropTypes.string.isRequired,
};
export default Sentry.withProfiler(Rank, { name: 'Rank' });
