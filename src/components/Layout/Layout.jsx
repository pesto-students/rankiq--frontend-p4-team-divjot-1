import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import theme from '../../theme/theme';
// cmp
import NavBar from './Navbar';
import Footer from './Footer';
import Login from '../Login';
import SignUp from '../Signup';
import UserHistory from '../UserHistory';
import DashBoard from '../DashBoard';
import Result from '../Result';
import FAQsCmp from '../FAQsCmp';
import ProtectedRoute from '../../routing/ProtectedRoute';

// const themeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#FE4066',
//     },
//     secondary: {
//       main: '#5D5959',
//     },
//     text: { navFooter: '#FFFFFF' },
//     box: { main: '#FAFAFA' },
//   },
// };

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box>
          <NavBar />
          <main>
            <Box
              id="content"
              sx={{
                minHeight: 'calc(100vh - 6rem)',
                overflowY: 'auto',
                marginTop: { xs: '3.5rem', sm: '4rem' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/result" element={<Result />} />
                <Route path="/faqs" element={<FAQsCmp />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/userHistory" element={<UserHistory />} />
                </Route>
              </Routes>
            </Box>
          </main>

          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Layout;
