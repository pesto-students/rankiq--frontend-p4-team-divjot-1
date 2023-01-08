import { useTheme } from '@emotion/react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

function FAQsCmp() {
  const theme = useTheme();
  const { t } = useTranslation();
  const FAQentries = t('FAQs', { returnObjects: true });
  return (
    <Paper sx={{ paddingY: '50px' }}>
      {FAQentries.map((FAQentry) => (
        <>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 'light',
              paddingInline: '15%',
              paddingTop: '35px',
              [theme.breakpoints.down('md')]: {
                fontSize: '18px',
              },
            }}
          >
            {FAQentry.que}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              paddingInline: '15%',
              paddingTop: '5px',
              [theme.breakpoints.down('md')]: {
                fontSize: '12px',
              },
            }}
          >
            {FAQentry.ans}
          </Typography>
        </>
      ))}
    </Paper>
  );
}

export default FAQsCmp;
