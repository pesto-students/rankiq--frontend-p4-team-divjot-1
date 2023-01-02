import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';
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

function Footer() {
  return (
    <footer>
      <Box
        paddingX={{ xs: 3, sm: 10 }}
        paddingY={{ xs: 3, sm: 10 }}
        sx={{
          backgroundColor: 'primary.main',
          marginTop: '2rem',
          color: 'text.navFooter',
          marginLeft: '0',
          marginRight: '0',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box
                display="flex"
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
              <Box>
                <Typography variant="h6" borderBottom={1} mb={1}>
                  Help
                </Typography>
                <LinksContainer>
                  <Box>
                    <StyledLink variant="body1" href="/">
                      Support
                    </StyledLink>
                  </Box>
                  <Box>
                    <StyledLink variant="body1" href="/">
                      Privacy
                    </StyledLink>
                  </Box>
                  <Box>
                    <StyledLink variant="body1" href="/">
                      FAQs
                    </StyledLink>
                  </Box>
                </LinksContainer>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" borderBottom={1} mb={1}>
                Help
              </Typography>
              <LinksContainer>
                <Box>
                  <StyledLink variant="body1" href="/">
                    Support
                  </StyledLink>
                </Box>
                <Box>
                  <StyledLink variant="body1" href="/">
                    Privacy
                  </StyledLink>
                </Box>
                <Box>
                  <StyledLink variant="body1" href="/">
                    FAQs
                  </StyledLink>
                </Box>
              </LinksContainer>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
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
            </Grid>
          </Grid>

          <Typography
            textAlign="center"
            pt={{ xs: 5, sm: 10 }}
            pb={{ xs: 5, sm: 10 }}
          >
            &reg; {new Date().getFullYear()} RankIQ. All rights reserved
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
