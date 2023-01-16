import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPassword from '../ResetPassword';
import theme from '../../theme/theme';

const mockStore = configureStore([thunk]);
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  return {
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate,
  };
});

describe('Dashboard.jsx', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
    userHistory: {
      loading: false,
      data: [
        { rollNumber: '1234', mark: 50 },
        { rollNumber: '4567', mark: 11 },
      ],
    },
    rankData: {
      loading: false,
      error: null,
      data: {
        overall: { rank: 1, overall: 12 },
        zone: { rank: 1, overall: 12 },
        zoneCategory: { rank: 1, overall: 12 },
        zoneShift: { rank: 1, overall: 12 },
        zoneShiftCategory: { rank: 1, overall: 12 },
        rawMarks: 12.12,
        zoneSelected: 'test zone',
      },
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ResetPassword />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not show any errors when password and confirm password is entered', async () => {
    const user = userEvent.setup();
    const passwordField = screen.getByTestId('ippassword');
    const passwordIp = passwordField.getElementsByTagName('input')[0];
    const cPasswordField = screen.getByTestId('ipcpassword');
    const cPasswordInput = cPasswordField.getElementsByTagName('input')[0];
    await user.click(cPasswordInput);
    await user.keyboard('rankiq@123');
    await user.click(passwordIp);
    await user.keyboard('rankiq@123');
    await user.tab();
    expect(screen.getByTestId('btnSubmit')).not.toBeDisabled();
  });

  it('should not show any errors when password and confirm password is entered', async () => {
    const user = userEvent.setup();
    const passwordField = screen.getByTestId('ippassword');
    const passwordIp = passwordField.getElementsByTagName('input')[0];
    const cPasswordField = screen.getByTestId('ipcpassword');
    const cPasswordInput = cPasswordField.getElementsByTagName('input')[0];
    await user.click(cPasswordInput);
    await user.keyboard('rankiq@123');
    await user.click(passwordIp);
    await user.keyboard('rankiq@123');
    await user.click(screen.getByTestId('btnReset'));
    expect(screen.getByTestId('btnSubmit')).toBeDisabled();
  });
});
