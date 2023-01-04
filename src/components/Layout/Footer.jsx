import { useTheme } from '@emotion/react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

const footerItems = ['Support', 'Privacy', 'FAQs'];

function Footer() {
  const theme = useTheme();
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'text.navFooter',
          height: '40px',
          [theme.breakpoints.down('md')]: {
            height: 'auto',
          },
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
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
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
              &reg; {new Date().getFullYear()} RankIQ. All rights reserved
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
                justifyContent: 'center',
                [theme.breakpoints.up('md')]: {
                  justifyContent: 'flex-end',
                },
              }}
            >
              <Button component={Link} sx={{ color: '#fff' }}>
                <FacebookIcon />
              </Button>
              <Button component={Link} sx={{ color: '#fff' }}>
                <InstagramIcon />
              </Button>
              <Button component={Link} sx={{ color: '#fff' }}>
                <YoutubeIcon />
              </Button>
              <Button component={Link} sx={{ color: '#fff' }}>
                <TelegramIcon />
              </Button>
              <Button component={Link} sx={{ color: '#fff' }}>
                <TwitterIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Footer;
