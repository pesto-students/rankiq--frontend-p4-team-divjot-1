import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const SocialContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.5rem',
});

const LinksContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
});

const footerItems = ['Support', 'Privacy', 'FAQs'];

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          //   marginTop: '2rem',
          color: 'text.navFooter',
          //   position: 'fixed',
          //   left: 0,
          //   bottom: 0,
          //   width: '100%',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2} md={2}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  columnGap: '0.25rem',
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-ranking-star" size="lg" />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: 'block' }}
                >
                  RankIQ
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Typography textAlign="center">
                &reg; {new Date().getFullYear()} RankIQ. All rights reserved
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {footerItems.map((item) => (
                  <Button component={Link} key={item} sx={{ color: '#fff' }}>
                    {item}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
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

            {/* <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" borderBottom={1} mb={1}>
                Social
              </Typography>
              <LinksContainer>
                <SocialContainer>
                  <FacebookIcon />
                  <StyledLink variant="body1" href="/">
                    facebook
                  </StyledLink>
                </SocialContainer>
                <SocialContainer>
                  <InstagramIcon />
                  <StyledLink variant="body1" href="/">
                    instagram
                  </StyledLink>
                </SocialContainer>
                <SocialContainer>
                  <YoutubeIcon />
                  <StyledLink variant="body1" href="/">
                    YouTube
                  </StyledLink>
                </SocialContainer>
                <SocialContainer>
                  <TelegramIcon />
                  <StyledLink variant="body1" href="/">
                    Telegram
                  </StyledLink>
                </SocialContainer>
                <SocialContainer>
                  <TwitterIcon />
                  <StyledLink variant="body1" href="/">
                    Twitter
                  </StyledLink>
                </SocialContainer>
              </LinksContainer>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
