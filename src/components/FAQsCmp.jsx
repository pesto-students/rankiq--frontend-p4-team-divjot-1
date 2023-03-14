import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';

function FAQsCmp() {
  const { t } = useTranslation();
  const FAQentries = t('FAQs', { returnObjects: true });
  return (
    <Container maxWidth="lg">
      <Paper sx={{ paddingY: '50px' }}>
        {FAQentries.map((FAQentry) => (
          <Fragment key={FAQentry.que}>
            <Typography
              sx={{
                fontWeight: 'light',
                paddingInline: '15%',
                paddingTop: '35px',
                fontSize: { sm: '1.5rem', xs: '1.125rem' },
              }}
            >
              {FAQentry.que}
            </Typography>
            <Typography
              sx={{
                paddingInline: '15%',
                paddingTop: '5px',
                fontSize: { sm: '1rem', xs: '0.75rem' },
              }}
            >
              {FAQentry.ans}
            </Typography>
          </Fragment>
        ))}
      </Paper>
    </Container>
  );
}

export default Sentry.withProfiler(FAQsCmp, { name: 'FAQ' });
