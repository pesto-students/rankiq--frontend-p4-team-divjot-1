// import { useTranslation } from 'react-i18next';
// @mui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

function DashboardInfoPane() {
  // const { t } = useTranslation();

  return (
    <Card
      sx={{
        padding: { xs: '2rem 1rem', sm: '2rem' },
        mt: '1rem',
        mb: { xs: '1rem', sm: '3rem' },
      }}
    >
      <Grid container mb={3} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            What is RankIQ?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontSize="18px" textAlign="center">
            RankiQ is an automated program built to calculate marks from
            response sheets of students and show them realtime rank depending on
            the number of students participated.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
        item
        xs={12}
      >
        <Typography
          sx={{ width: '150px', paddingY: '8px', borderRadius: '10px' }}
          backgroundColor="primary.main"
          color="white"
          variant="h5"
          textAlign="center"
        >
          Features
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minHeight: '205px',
              ':hover': {
                boxShadow: 20,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: '#f36825', color: 'white' }}>
                  <LeaderboardIcon />
                </Avatar>
              }
              title={
                <Typography variant="h5" fontSize="18px">
                  Ranks
                </Typography>
              }
            />
            <CardContent>
              <Typography fontSize="16px" color="text.secondary">
                Relatime all India rank, Category Rank and Shiftwise Rank.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minHeight: '205px',
              ':hover': {
                boxShadow: 20,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: '#f36825', color: 'white' }}>
                  <QueryStatsIcon fontSize="large" />
                </Avatar>
              }
              title={
                <Typography variant="h5" fontSize="18px">
                  Performance
                </Typography>
              }
            />
            <CardContent>
              <Typography fontSize="16px" color="text.secondary">
                Sectional performance, total attempted, correct & incorrect.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minHeight: '205px',
              ':hover': {
                boxShadow: 20,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: '#f36825', color: 'white' }}>
                  <FormatAlignLeftIcon fontSize="large" />
                </Avatar>
              }
              title={
                <Typography variant="h5" fontSize="18px">
                  Normalisation
                </Typography>
              }
            />
            <CardContent>
              <Typography fontSize="16px" color="text.secondary">
                Predicts normalised score in case of multiple shifts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DashboardInfoPane;
