import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Dashboard from '../DashBoard';
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
            <Dashboard />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not show any error if no error is present in form', async () => {
    const user = userEvent.setup();
    const urlField = screen.getByTestId('ipUrl');
    const urlIp = urlField.getElementsByTagName('input')[0];
    const categoryField = screen.getByTestId('ipcategory');
    const categoryIp = categoryField.getElementsByTagName('input')[0];
    const reservationField = screen.getByTestId('ipreservation');
    const reservationIp = reservationField.getElementsByTagName('input')[0];
    const zoneField = screen.getByTestId('ipzone');
    const zoneIp = zoneField.getElementsByTagName('input')[0];
    await user.click(urlIp);
    await user.keyboard('test.com');
    await user.click(categoryIp);
    const categoryOption = screen.getByText('exam.category.open');
    await user.click(categoryOption);
    await user.click(reservationIp);
    const reservationOption = screen.getByText('exam.reservation.ccaa');
    await user.click(reservationOption);
    await user.click(zoneIp);
    const zoneOption = screen.getByText('exam.rrb.delhi');
    await user.click(zoneOption);

    await user.click(screen.getByTestId('btnSubmit'));
    expect(screen.getByTestId('btnSubmit')).not.toBeDisabled();
    expect(screen.queryByText('generic.required')).not.toBeInTheDocument();
  });
  it('should disable submit button if error are present in form', async () => {
    const user = userEvent.setup();
    const urlField = screen.getByTestId('ipUrl');
    const urlIp = urlField.getElementsByTagName('input')[0];
    await user.click(urlIp);
    await user.keyboard('test.com');
    await user.click(screen.getByTestId('btnSubmit'));
    expect(screen.getByTestId('btnSubmit')).toBeDisabled();
    expect(screen.queryAllByText('generic.required')).toHaveLength(3);
  });

  it('should disable submit button if error are present in form', async () => {
    const user = userEvent.setup();
    const urlField = screen.getByTestId('ipUrl');
    const urlIp = urlField.getElementsByTagName('input')[0];
    await user.click(urlIp);
    await user.keyboard('test.com');
    await user.click(screen.getByTestId('btnreset'));
    expect(screen.getByTestId('btnSubmit')).not.toBeDisabled();
    expect(screen.queryByText('generic.required')).not.toBeInTheDocument();
  });
});
