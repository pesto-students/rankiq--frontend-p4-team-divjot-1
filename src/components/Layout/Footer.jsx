import { useTranslation } from 'react-i18next';
// @mui
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
// logs
import * as Sentry from '@sentry/react';

function Footer() {
  const { t } = useTranslation();
  const footerItems = [
    t('footer.support'),
    t('footer.privacy'),
    t('footer.FAQs'),
  ];

  return (
    <footer>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'text.navFooter',
          height: { md: '2.5rem', sm: 'auto' },
        }}
      >
        <Grid
          container
          sx={{ alignItems: 'center', width: '100%', paddingInline: '24px' }}
        >
          <Grid item xs={12} sm={3} md={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                columnGap: '0.25rem',
                justifyContent: { md: 'normal', xs: 'center' },
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-ranking-star" size="lg" />
              <Typography variant="h6" component="div">
                RankIQ
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography noWrap textAlign="center">
              &reg; {new Date().getFullYear()}
              {` RankIQ. ${t('footer.rights')}`}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {footerItems.map((item) => (
                <Button component={Link} key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { lg: 'flex-end', xs: 'center' },
              }}
            >
              <Button
                component={Link}
                // href="https://www.facebook.com/RankiQ.in"
                sx={{ color: '#fff' }}
              >
                <FacebookIcon />
              </Button>
              <Button
                component={Link}
                // href="https://www.instagram.com/rankiq.in/?hl=en"
                sx={{ color: '#fff' }}
              >
                <InstagramIcon />
              </Button>
              <Button
                component={Link}
                // href="https://www.youtube.com/channel/UCK-34bq-b4OrbOJ9t4lEhsg"
                sx={{ color: '#fff' }}
              >
                <YoutubeIcon />
              </Button>
              <Button
                component={Link}
                // href="https://telegram.me/RankiQ"
                sx={{ color: '#fff' }}
              >
                <TelegramIcon />
              </Button>
              <Button
                component={Link}
                // href="https://twitter.com/RankiQ_in"
                sx={{ color: '#fff' }}
              >
                <TwitterIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Sentry.withProfiler(Footer, { name: 'Footer' });
