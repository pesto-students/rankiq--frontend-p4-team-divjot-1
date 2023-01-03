import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import theme from '../../theme/theme';
import NavBar from './Navbar';
import Footer from './Footer.1';
import Login from '../Login';
import SignUp from '../Signup';
import UserHistory from '../UserHistory';
import DashBoard from '../DashBoard';
import Result from '../Result';
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
              minHeight: 'calc(100vh - 130px)',
              overflowY: 'auto',
              marginTop: '90px',
              paddingInline: '24px',
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/result" element={<Result />} />
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
