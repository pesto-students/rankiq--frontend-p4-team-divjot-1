import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Signup from '../Signup';
import theme from '../../theme/theme';

const mockStore = configureStore([thunk]);
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  return {
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate,
  };
});

describe('Login.jsx - when user is not logged in', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: {},
      accessToken: 'testToken',
      loading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should disable login button if invalid value is entered', async () => {
    const user = userEvent.setup();
    const emailField = screen.getByTestId('ipemail');
    const emailIp = emailField.getElementsByTagName('input')[0];
    const passwordField = screen.getByTestId('ippassword');
    await user.click(emailIp);
    await user.keyboard('test');
    await user.click(passwordField);
    expect(screen.queryByText('errors.email')).toBeInTheDocument();
    expect(screen.queryByTestId('btnSubmit')).toBeDisabled();
  });

  it('should enable login button if values are valid', async () => {
    const user = userEvent.setup();
    const emailField = screen.getByTestId('ipemail');
    const emailIp = emailField.getElementsByTagName('input')[0];
    const passwordField = screen.getByTestId('ippassword');
    const passwordIp = passwordField.getElementsByTagName('input')[0];
    const cPasswordField = screen.getByTestId('ipcpassword');
    const cPasswordInput = cPasswordField.getElementsByTagName('input')[0];
    const fnameField = screen.getByTestId('ipfname');
    const fnameInput = fnameField.getElementsByTagName('input')[0];
    await user.click(emailIp);
    await user.keyboard('test@test.com');
    await user.click(cPasswordInput);
    await user.keyboard('rankiq@123');
    await user.click(passwordIp);
    await user.keyboard('rankiq@123');
    await user.click(fnameInput);
    await user.keyboard('test user');
    await user.keyboard('{Tab}');
    await user.click(screen.queryByTestId('btnSubmit'));
    expect(screen.queryByTestId('btnSubmit')).not.toBeDisabled();
  });

  it('should reset form when reset button is clicked', async () => {
    const user = userEvent.setup();
    const emailField = screen.getByTestId('ipemail');
    const emailIp = emailField.getElementsByTagName('input')[0];
    const passwordField = screen.getByTestId('ippassword');
    const passwordIp = passwordField.getElementsByTagName('input')[0];
    await user.click(emailIp);
    await user.keyboard('test@test.com');
    await user.click(passwordIp);
    await user.keyboard('rankiq@123');
    await user.keyboard('{Tab}');
    await user.click(screen.queryByTestId('btnreset'));
    expect(screen.queryByTestId('btnSubmit')).toBeDisabled();
  });

  it('should navigate to dashboard page when user clicks on continue as guest', async () => {
    const user = userEvent.setup();
    const guestBtn = screen.getByTestId('btnGuest');
    await user.click(guestBtn);
    expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  });
});

describe('Login.jsx - when user is logged in', () => {
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should navigate dashboard page if user is logged in', () => {
    expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  });
});

describe('Login.jsx -when signup is successful', () => {
  let store;
  const storeData = {
    auth: {
      userInfo: {},
      accessToken: null,
      success: true,
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should navigate to login when signup is successful', () => {
    expect(navigate).toHaveBeenLastCalledWith('/login');
  });
});
