import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import theme from '../../theme/theme';
import NavBar from './Navbar';
import Footer from './Footer';
import Login from '../Login';
import SignUp from '../Signup';
import UserHistory from '../UserHistory';
import DashBoard from '../DashBoard';
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
          <main
            id="content"
            style={{
              height: 'calc(100% - 90px)',
              overflowY: 'auto',
              marginTop: '90px',
              paddingInline: '24px',
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/userHistory" element={<UserHistory />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Layout;
